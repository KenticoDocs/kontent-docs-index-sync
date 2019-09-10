import {
    AzureFunction,
    Context,
} from '@azure/functions';
import {
    Configuration,
    getBlobFromStorage,
    IBlobEventGridEvent,
    IItemRecordsBlob,
} from 'cloud-docs-shared-code';
import {
    deleteRecordsByCodename,
    indexRecords,
    syncAlgoliaRecords,
} from '../external/searchIndex';
import { getBlobContainerName } from '../utils/getBlobContainerName';
import { sanitizeRecords } from '../utils/sanitizeRecords';

export const eventGridTrigger: AzureFunction =
    async (context: Context, eventGridEvent: IBlobEventGridEvent): Promise<void> => {
        try {
            const container = getBlobContainerName(eventGridEvent);
            const isTest = container.includes('test');

            Configuration.set(isTest);

            const blob = await getBlobFromStorage(
                eventGridEvent.data.url,
                Configuration.keys.azureAccountName,
                Configuration.keys.azureStorageKey,
            ) as IItemRecordsBlob;

            const sanitizedRecords = sanitizeRecords(blob.itemRecords);

            if (blob.itemRecords.length === 0) {
                await deleteRecordsByCodename(blob.codename);
            } else if (blob.initialize) {
                await indexRecords(sanitizedRecords);
            } else {
                await syncAlgoliaRecords(blob, sanitizedRecords);
            }
        } catch (error) {
            /** This try-catch is required for correct logging of exceptions in Azure */
            throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
        }
    };
