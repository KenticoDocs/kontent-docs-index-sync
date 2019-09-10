import { Task } from 'algoliasearch';
import {
    IItemRecordsBlob,
    IRecord,
} from 'cloud-docs-shared-code';
import { diffRecords } from '../utils/diffRecords';
import { getSearchIndex } from './getSearchIndex';

export const syncAlgoliaRecords = async (blob: IItemRecordsBlob, sanitizedRecords: IRecord[]) => {
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
        distinct: 0,
        filters: `id:${id}`,
        hitsPerPage: 1000,
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

export const clearIndex = async (section: string, id?: string): Promise<void> => {
    const filters = id
        ? `id:${id}`
        : `section:${section}`;

    await getSearchIndex().deleteBy({
        filters,
    });
};
