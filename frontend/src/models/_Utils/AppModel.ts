import { Watchable } from "./Watchable";

export abstract class AppModel<R, T = R extends Watchable<infer U> ? Watchable<U> : Watchable<any>> {
    abstract data: T;
}
