import { Action } from "redux";

export interface ActionWithPayload<PayloadType> extends Action {
    payload?: PayloadType;
}

/**
 * Provides a convinient way of creating creducers by using object map instead of switch - case statements
 * @param initialState the initial state for the reducers
 * @param reducerMap the reducers
 */
function createReducer<RStateT>(
    initialState: RStateT,
    reducerMap: {
        [key: string]: (state: RStateT, payload?: any) => RStateT;
    },
) {
    return (state = initialState, action: ActionWithPayload<any>): RStateT => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}

export default createReducer;
