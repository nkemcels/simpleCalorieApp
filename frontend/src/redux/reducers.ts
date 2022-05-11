import { combineReducers } from "redux";
import app, { AppStateT } from "./services/app/reducer";
import auth, { AuthStateT } from "./services/auth/reducer";
import user, { UserStateT } from "./services/user/reducer";
import calorieEntry, { TCalorieEntryState } from "./services/calorieEntry/reducer";

// Root state of the store
export type RootState = {
    app: AppStateT;
    auth: AuthStateT;
    user: UserStateT;
    calorieEntry: TCalorieEntryState;
};

// Root reducer configuration
const rootReducer = combineReducers<RootState>({
    app,
    auth,
    user,
    calorieEntry,
});

export default rootReducer;
