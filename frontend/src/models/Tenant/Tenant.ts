import { ICustomer } from "../Customer/Customer";
import { IDevice } from "../Device/Device";

export interface ITenant {
    _id: string;
    apiKeys: { _id: string; key: string; createdDate: string; accessCount: number; lastAccessed: string; expiresAt: string }[];
    applications: { _id: string; appId: string; createdDate: string; name: string; appType: TTenantApplicationType }[];
    name: string;
    customer: ICustomer;
    createdBy: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITenantDetails {
    tenant: ITenant;
    devices: IDevice[];
}

export type TTenantApplicationType = "device" | "backend" | "frontend";
