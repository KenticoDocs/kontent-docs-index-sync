import { IRecord } from 'kontent-docs-shared-code';
import { areRecordsEqual } from './areRecordsEqual';

function filterEqualRecord(algoliaRecord: IRecord, matchingRecordByObjectId: IRecord, recordsToIndex: IRecord[]) {
    const areEqual = areRecordsEqual(algoliaRecord, matchingRecordByObjectId);

    if (areEqual) {
        recordsToIndex = recordsToIndex.filter(
            (record: IRecord) => record.objectID !== algoliaRecord.objectID,
        );
    }
    return recordsToIndex;
}

export const diffRecords = (recordsToIndex: IRecord[], recordsFromAlgolia: IRecord[]) => {
    const recordsToDelete = [];

    for (const algoliaRecord of recordsFromAlgolia) {
        const matchingRecordByObjectId = recordsToIndex.find(
            (record: IRecord) => record.objectID === algoliaRecord.objectID,
        );

        if (matchingRecordByObjectId) {
            recordsToIndex = filterEqualRecord(algoliaRecord, matchingRecordByObjectId, recordsToIndex);
        } else {
            recordsToDelete.push(algoliaRecord.objectID);
        }
    }

    return {
        recordsToDelete,
        recordsToIndex,
    }
};
