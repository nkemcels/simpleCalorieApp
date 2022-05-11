import { applyMiddleware, createStore, Store } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import rootReducer, { RootState } from "../reducers";

export function createSimpleMockStore(initialState?: RootState) {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    return mockStore(initialState);
}

export function createAppMockStore(initialState?: RootState) {
    const store: Store<RootState> = createStore(rootReducer, initialState, applyMiddleware(thunk));

    return store;
}
