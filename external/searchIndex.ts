import { Task } from 'algoliasearch';
import { diffRecords } from '../utils/diffRecords';
import { getSearchIndex } from './getSearchIndex';
import {
    IBlob,
    IRecord,
} from './models';

export const syncAlgoliaRecords = async (blob: IBlob, sanitizedRecords: IRecord[]) => {
    const recordsFromAlgolia = await getRecordsById(blob.id);
    const {
        recordsToDelete,
        recordsToIndex,
    } = await diffRecords(sanitizedRecords, recordsFromAlgolia);

    if (recordsToDelete.length > 0) {
        await deleteRecordsByObjectId(recordsToDelete);
    }

    await indexRecords(recordsToIndex);
};

const getRecordsById = async (id: string): Promise<IRecord[]> => {
    const response = await getSearchIndex().search<IRecord>({
        filters: `id:${id}`,
    });

    return response.hits;
};

const deleteRecordsByObjectId = async (objectIds: string[]): Promise<void> => {
    const objectIdFilter = objectIds
        .map((objectId: string) => `objectID:${objectId}`)
        .join(' OR ');

    await getSearchIndex().deleteBy({
        filters: objectIdFilter,
    });
};

export const indexRecords = async (records: IRecord[]): Promise<Task> =>
    await getSearchIndex().saveObjects(records);

export const deleteRecordsByCodename = async (codename: string): Promise<void> => {
    await getSearchIndex().deleteBy({
        filters: `codename:${codename}`,
    });
};

export const clearIndex = async (section: string): Promise<void> => {
    await getSearchIndex().deleteBy({
        filters: `section:${section}`,
    });
};
