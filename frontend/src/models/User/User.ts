import moment from "moment";

export type TUserData = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
};
