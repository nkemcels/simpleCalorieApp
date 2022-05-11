import moment from "moment";

export interface IUserData {
    _id: string;
    names: string;
    email: string;
    weight: number;
    height: number;
    gender: "male" | "female";
    dateOfBirth: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
}
