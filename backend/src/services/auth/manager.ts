import { BadRequestError } from "../../errorTypes/BadRequestError";
import { UnAuthorizedRequestError } from "../../errorTypes/UnAuthorizedRequestError";
import { UserAuthCredentials, AdminLoginData } from "../../models/appTypes/Auth";
import { UserDoc, User, UserAttr } from "../../models/db/User/User";
import { JsonWebToken } from "../../utils/JWTManager";
import { PasswordManager } from "../../utils/Password";

export class AuthManager {
    private getUserAuthData = (user: UserDoc): AdminLoginData => {
        const { password, ...adminData } = user.toJSON();
        const tokenData = { adminId: user._id, email: user.email };
        const token = JsonWebToken.generateToken(tokenData);
        return {
            access_token: token,
            adminId: user._id,
            token_type: "Bearer",
            expires_in: JsonWebToken.getTokenExpirationTime(token)!,
            adminData: adminData,
        };
    };

    authenticateUser = async (creds: UserAuthCredentials) => {
        let { email, password } = creds;
        if (!email || !password) throw new BadRequestError("Missing email or password");
        const admin = await User.findOne({ email }).select("+password").populate("organizations");
        if (admin) {
            const valid = await PasswordManager.comparePassword(password, admin.password || "");
            if (valid) {
                const adminLoginData = this.getUserAuthData(admin);
                return adminLoginData;
            }
        }

        throw new UnAuthorizedRequestError();
    };

    async registerUser(userData: UserAttr) {
        const user = User.build({ ...userData });
        const userExists = await User.findOne({ email: userData.email });
        if (userExists) throw new BadRequestError("The specified email is already in use by another user");
        await user.save();

        return user;
    }

    verifyUserToken = async (token: string) => {
        const userData = JsonWebToken.decodeToken(token);
        if (userData) {
            const user = await User.findOne({ _id: userData.adminId });
            if (user) return user;
        }

        throw new UnAuthorizedRequestError();
    };

    refreshUserToken = async (token: string) => {
        try {
            const user = await this.verifyUserToken(token);
            const userData = this.getUserAuthData(user);

            return userData;
        } catch (err) {
            throw new UnAuthorizedRequestError();
        }
    };
}
