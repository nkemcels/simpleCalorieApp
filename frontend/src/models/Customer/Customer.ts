import { IDevice } from "../Device/Device";
import { ITenant } from "../Tenant/Tenant";

export interface ICustomer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    profilePhotoUrl: string;
    application: string;
    approvedBy: string;
}

export interface ICustomerDetails {
    customer: ICustomer;
    application: ICustomerApplication;
    devices: IDevice[];
    tenants: ITenant[];
}

type TAzureBlob = {
    blobUrl: string;
    blobName: string;
    data?: Blob;
};

export interface ICustomerApplication {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    address: string;
    dateOfBirth: string;
    rejectionReason?: string | null;
    profilePhoto?: TAzureBlob;
    licencePhoto?: TAzureBlob;
    legalAgreement: TAzureBlob;
    applicationStatus: "approved" | "pending" | "rejected";
    createdAt: string;
    updatedAt: string;
}
