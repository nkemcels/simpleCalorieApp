import { Types } from "mongoose";
import { BadRequestError } from "../../errorTypes/BadRequestError";
import { UserAuthCredentials } from "../../models/appTypes/Auth";
import { User, UserAttr } from "../../models/db/User/User";

export class UserManager {
    async getCompleteUser(userId: Types.ObjectId) {
        const user = await User.findOne({ _id: userId }).select("");
        if (!user) throw new BadRequestError("User not found");
        return user;
    }

    async updateUserPassword(userId: Types.ObjectId, userData: UserAuthCredentials) {
        let { password } = userData;
        const user = await User.findOne({ _id: userId });
        if (!user) throw new BadRequestError("User Not found");

        user.password = password;
        user.markModified("password");
        await user.save();

        return user;
    }

    async updateUserInfo(userId: Types.ObjectId, updateData: Partial<UserAttr>) {
        const user = await User.findOneAndUpdate({ _id: userId }, { ...updateData }, { new: true });
        if (!user) throw new BadRequestError("User not found");

        return this.getCompleteUser(userId);
    }

    async deleteAccount() {
        //
    }
}
