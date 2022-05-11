import moment from "moment";

export interface IUserData {
    _id: string;
    names: string;
    email: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
}
