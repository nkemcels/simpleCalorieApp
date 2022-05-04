import { ISimpleUser } from "../User/SimpleUserType";

export type NotificationTypes = {
    // ORG_MEMBER_ADDED: { member: TOrgMemberAttr; createdBy: ISimpleUser; organization: TOrganizationAttr };
    DEFAULT: string;
};

export type TNotificationItem = keyof NotificationTypes;

export interface INotification<T extends keyof NotificationTypes = keyof NotificationTypes> {
    _id: string;
    type: T;
    data: NotificationTypes[T];
    message?: string;
    user: string;
    isRead?: boolean;
    source?: ISimpleUser | null;
    createdAt: string;
}
