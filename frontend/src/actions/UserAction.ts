import { USER_DATA_API } from "../constants/apiEndpoints";
import { HTTPHelper } from "../misc/httpHelper";
import { IUserData } from "../models/User";
import { UserStoreActions } from "../redux/services/user/actions";

export class UserAction {
    static store = UserStoreActions;
    static async updateUserData(data: Partial<IUserData>) {
        const resp = await HTTPHelper.put(USER_DATA_API, data);
        UserAction.store.saveUser(resp.data);
        return resp.data;
    }
}
