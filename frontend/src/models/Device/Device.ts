import { ITenant } from "./../Tenant/Tenant";

export interface IDevice {
    _id: string;
    name: string;
    tenant: ITenant;
    createdAt: string;
    updatedAt: string;
}
