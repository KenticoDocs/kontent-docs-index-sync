import {
    Aborter,
    BlobURL,
    SharedKeyCredential,
    StorageURL,
} from '@azure/storage-blob';
import { Configuration } from './configuration';
import { IBlob } from './models';

export const getRecordsFromBlobStorage = async (url: string): Promise<IBlob> => {
    const {
        azureAccountName,
        azureStorageKey,
    } = Configuration.keys;

    const sharedKeyCredential = new SharedKeyCredential(azureAccountName, azureStorageKey);
    const pipeline = StorageURL.newPipeline(sharedKeyCredential);

    const blobUrl = new BlobURL(url, pipeline);

    const blobResponse = await blobUrl.download(Aborter.none, 0);

    return JSON.parse(await streamToString(blobResponse.readableStreamBody));
};

const streamToString = async (readableStream: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const chunks: string[] = [];
        readableStream.on('data', (data: any) => {
            chunks.push(data.toString());
        });
        readableStream.on('end', () => {
            resolve(chunks.join(''));
        });
        readableStream.on('error', reject);
    });
};
