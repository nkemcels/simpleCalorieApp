export interface ISimpleUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    lastActivity?: string; // date string
}
