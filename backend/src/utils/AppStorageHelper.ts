import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { GlobalSettings } from "./GlobalSettings";

type TUploadSuccess = { blobName: string; blobUrl: string };
type TUploadCallback = (err: string | null, data?: TUploadSuccess) => void;
type TDownloadCallback = (err: string | null, data?: Buffer) => void;

export class AzureBlobStorage {
    constructor(private blobStorageUrl: string, private storageContainerName: string) {}
    getBlobStringName = (name: string) => {
        return `${name}`;
    };

    uploadToBlobStorage = async (file: Buffer, bName: string, callback: TUploadCallback = () => {}) => {
        const blobNameString = this.getBlobStringName(bName).replace(/\s+/, "_");
        const sharedKeyCredential = new StorageSharedKeyCredential(GlobalSettings.azure.accountId, GlobalSettings.azure.accountKey);

        const blobServiceClient = new BlobServiceClient(this.blobStorageUrl, sharedKeyCredential);

        const containerClient = blobServiceClient.getContainerClient(this.storageContainerName);
        await containerClient.createIfNotExists();

        const blockBlobClient = containerClient.getBlockBlobClient(blobNameString);
        return blockBlobClient
            .uploadData(file)
            .then(() => {
                callback(null, { blobUrl: blockBlobClient.url, blobName: blobNameString });
                return { blobUrl: blockBlobClient.url, blobName: blobNameString };
            })
            .catch((err) => {
                callback(`${err}`);
                throw err;
            });
    };

    deleteBlobFromStorage = async (blobName: string, callback: TUploadCallback = () => {}) => {
        const sharedKeyCredential = new StorageSharedKeyCredential(GlobalSettings.azure.accountId, GlobalSettings.azure.accountKey);
        const blobServiceClient = new BlobServiceClient(this.blobStorageUrl, sharedKeyCredential);

        const containerClient = blobServiceClient.getContainerClient(this.storageContainerName);

        const blockBlobClient = containerClient.getBlobClient(blobName);
        return blockBlobClient
            .deleteIfExists()
            .then(() => {
                callback(null);
                return null;
            })
            .catch((err) => {
                callback(`${err}`);
                throw err;
            });
    };

    undeleteBlobFromStorage = async (blobName: string, callback: TUploadCallback = () => {}) => {
        const sharedKeyCredential = new StorageSharedKeyCredential(GlobalSettings.azure.accountId, GlobalSettings.azure.accountKey);
        const blobServiceClient = new BlobServiceClient(this.blobStorageUrl, sharedKeyCredential);

        const containerClient = blobServiceClient.getContainerClient(this.storageContainerName);

        const blockBlobClient = containerClient.getBlobClient(blobName);
        return blockBlobClient
            .undelete()
            .then(() => {
                callback(null);
                return null;
            })
            .catch((err) => {
                callback(`${err}`);
                throw err;
            });
    };

    downloadBlobFromStorage = async (blobName: string, callback: TDownloadCallback = () => {}) => {
        const sharedKeyCredential = new StorageSharedKeyCredential(GlobalSettings.azure.accountId, GlobalSettings.azure.accountKey);
        const blobServiceClient = new BlobServiceClient(this.blobStorageUrl, sharedKeyCredential);

        const containerClient = blobServiceClient.getContainerClient(this.storageContainerName);

        const blockBlobClient = containerClient.getBlobClient(blobName);
        return blockBlobClient
            .downloadToBuffer()
            .then((file) => {
                callback(null, file);
                return file;
            })
            .catch((err) => {
                callback(`${err}`);
                throw err;
            });
    };

    static defaultInstance = () => {
        return new AzureBlobStorage(GlobalSettings.azure.blobStorageUrl, GlobalSettings.azure.blobStorageContainer);
    };
}
