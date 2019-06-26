import {
    AzureFunction,
    Context,
} from '@azure/functions';
import { Configuration } from '../external/configuration';
import { getRecordsFromBlobStorage } from '../external/getRecordsFromBlobStorage';
import { IEventGridEvent } from '../external/models';
import {
    deleteRecordsByCodename,
    indexRecords,
    syncAlgoliaRecords,
} from '../external/searchIndex';
import { getBlobContainerName } from '../utils/getBlobContainerName';
import { sanitizeRecords } from '../utils/sanitizeRecords';

export const eventGridTrigger: AzureFunction =
    async (context: Context, eventGridEvent: IEventGridEvent): Promise<void> => {
        try {
            const container = getBlobContainerName(eventGridEvent);
            const isTest = container.includes('test');

            Configuration.set(isTest);

            const blob = await getRecordsFromBlobStorage(eventGridEvent.data.url);
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
