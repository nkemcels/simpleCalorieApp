import { SimpleCallback, SimpleCallbackWithArg } from "../Callback/Callback";

type GlobalWatcherCallback<E> = (evt: keyof E, data: E[keyof E]) => void;

export abstract class Watchable<E> {
    // private static __AddedGlobalInstances: any[] = []; // for debugging
    // private static __RemovedGlobalInstances: any[] = []; // for debugging
    private eventListeners: { [key: string]: SimpleCallback[] | undefined } = {};
    private globalEventListeners: GlobalWatcherCallback<E>[] = [];
    watchGlobal(cb: GlobalWatcherCallback<E>) {
        if (!this.globalEventListeners.some((t) => t === cb)) {
            // Watchable.__AddedGlobalInstances.push(this);
            this.globalEventListeners.push(cb);
            // console.log("GLOBAL WATCHER ++ADDED++ FOR ", cb, ", VALS ", this.globalEventListeners);
        }
    }
    watch<K extends string & keyof E>(evt: K, cb: SimpleCallbackWithArg<E[K]>) {
        const listeners = this.eventListeners[evt] || [];
        if (!listeners.some((t) => t === cb)) {
            listeners.push(cb);
            this.eventListeners[evt] = listeners;
            // console.log("WATCHER ++ADDED++ FOR ", evt, "=>", cb);
        }
    }

    unwatch<K extends string & keyof E>(evt: K, cb: SimpleCallbackWithArg<E[K]>) {
        const listeners = this.eventListeners[evt] || [];
        if (listeners) {
            // console.log("LENGTH BEFORE ", listeners.length);
            this.eventListeners[evt] = listeners.filter((t) => t !== cb);
            // console.log("LENGTH AFTER ", listeners);
            // console.log("WATCHER --REMOVED-- FOR ", evt, "=>", cb);
        }
    }

    unwatchGlobal(cb: GlobalWatcherCallback<E>) {
        // console.log("GLENGTH BEFORE ", this.globalEventListeners.length);
        this.globalEventListeners = this.globalEventListeners.filter((t) => t !== cb);
        // console.log("GLENGTH AFTER ", this.globalEventListeners);
        // console.log("GLOBAL WATCHER --REMOVED-- FOR ", cb);
    }

    protected trigger<K extends string & keyof E>(evt: K, data: E[K]) {
        const listeners = this.eventListeners[evt] || [];
        listeners.forEach((cb) => {
            cb(data);
        });
        this.globalEventListeners.forEach((cb) => {
            cb(evt, data);
        });
    }
}

// window.watchables = Watchable;
