export type QueryResultCallback<T = any, R = void> = (err: string | null, data?: T) => R;

export type SimpleCallback<T = any, R = void> = (arg?: T) => R;

export type SimpleCallbackWithArg<T, R = void> = (arg: T) => R;
