import { createStore, applyMiddleware, compose, Store, Middleware } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer, { RootState } from "./reducers";

const composeEnhancers = compose;
const debugware: Middleware[] = [];

/**
 *
 * @param initialState The initial state to use while creating the store
 * @returns the created app store
 */
const createAppStore = (initialState?: RootState) => {
    // TODO: 1. Add redux store subscriber to save some important parts of the store to the localStorage when it changes
    // TODO: 2. load the initial app state from localStorage
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line global-require
        const { createLogger } = require("redux-logger");

        debugware.push(
            createLogger({
                collapsed: true,
            }),
        );
    }

    const store: Store<RootState> = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, ...debugware)));

    return store;
};

const store = createAppStore();

export function getAppStore() {
    return store;
}
