import moment from "moment";

export type TUserData = {
    _id: string;
    names: string;
    email: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
};
