import mongoose, { Types, Schema } from "mongoose";
import { PasswordManager } from "../../../utils/Password";

export interface UserAttr {
    weight: number;
    height: number;
    gender: "male" | "female";
    dateOfBirth: string;
    names: string;
    email: string;
    password: string;
}

export interface UserDoc extends UserAttr, mongoose.Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc;
}

const UserSchema = new Schema<UserDoc, UserModel>(
    {
        names: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String },
        height: { type: Number },
        weight: { type: Number },
        email: { type: String, unique: true },
        password: { type: String, select: false },
    },
    { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const password = this.get("password");
        const pwdHash = await PasswordManager.hashPassword(password);
        this.set("password", pwdHash);
        done();
    } else done();
});

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

User.build = (userAttr: UserAttr): UserDoc => {
    return new User(userAttr);
};

export { User };
