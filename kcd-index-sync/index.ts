import {
    AzureFunction,
    Context,
} from '@azure/functions';
import {
    Configuration,
    getBlobFromStorage,
    IBlobEventGridEvent,
    IItemRecordsBlob,
    Operation,
    Section,
} from 'kontent-docs-shared-code';
import {
    deleteRecordsByCodename,
    deleteRecordsById,
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
            const url = eventGridEvent.data.url;

            Configuration.set(isTest);

            const blob = await getBlobFromStorage(
                url,
                Configuration.keys.azureAccountName,
                Configuration.keys.azureStorageKey,
            ) as IItemRecordsBlob;

            await updateIndex(blob);

            context.res = {
                status: 200,
                body: `Finished processing blob '${url}'`,
            };
        } catch (error) {
            /** This try-catch is required for correct logging of exceptions in Azure */
            throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
        }
    };

const updateIndex = async (blob: IItemRecordsBlob): Promise<void> => {
    const sanitizedRecords = sanitizeRecords(blob.itemRecords);

    switch (blob.operation) {
        case Operation.Initialize:
            await indexRecords(sanitizedRecords);
            break;

        case Operation.Update:
            await syncAlgoliaRecords(blob, sanitizedRecords);
            break;

        case Operation.Delete:
            await deleteRecords(blob);
            break;

        default:
            throw Error('Unsupported operation!');
    }
};

const deleteRecords = async (blob: IItemRecordsBlob): Promise<void> => {
    switch (blob.section) {
        case Section.Api:
            await deleteRecordsById(blob.id);
            break;

        case Section.Tutorials:
            await deleteRecordsByCodename(blob.codename);
            break;

        default:
            throw Error('Unknown section!');
    }
};
