import {
    IRecord,
    Section,
} from 'kontent-docs-shared-code';
import { diffRecords } from './diffRecords';

describe('diffRecords', () => {
    it('should remove equal record from itemRecords that will be indexed', () => {
        const record: IRecord = {
            codename: 'article',
            content: 'Hello world!',
            heading: 'World',
            id: '123',
            objectID: 'article_3',
            order: '3',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const record2: IRecord = {
            codename: 'article',
            content: 'Hello world! 2',
            heading: 'World',
            id: '123',
            objectID: 'article_1',
            order: '1',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const recordInAlgolia = {
            ...record,
        };
        const recordsFromBlob = [
            record,
            record2,
        ];
        const recordsFromAlgolia = [recordInAlgolia];

        const {
            recordsToDelete,
            recordsToIndex,
        } = diffRecords(recordsFromBlob, recordsFromAlgolia);

        expect(recordsToIndex).toStrictEqual([record2]);
        expect(recordsToDelete).toStrictEqual([]);
    });

    it('should leave all itemRecords to index when no objectID match found', () => {
        const record: IRecord = {
            codename: 'article',
            content: 'Hello world!',
            heading: 'World',
            id: '123',
            objectID: 'article_3',
            order: '3',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const record2: IRecord = {
            codename: 'article',
            content: 'Hello world! 2',
            heading: 'World',
            id: '123',
            objectID: 'article_2',
            order: '1',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const record3: IRecord = {
            codename: 'article',
            content: 'Hello world!',
            heading: 'World',
            id: '123',
            objectID: 'article_1',
            order: '1',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const recordsFromBlob = [
            record,
            record2,
        ];
        const recordsFromAlgolia = [record3];

        const {
            recordsToDelete,
            recordsToIndex,
        } = diffRecords(recordsFromBlob, recordsFromAlgolia);

        expect(recordsToIndex).toStrictEqual([record, record2]);
        expect(recordsToDelete).toStrictEqual([record3.objectID]);
    });

    it('should leave all itemRecords to index when no matching itemRecords are found', () => {
        const record: IRecord = {
            codename: 'article',
            content: 'Hello world!',
            heading: 'World',
            id: '123',
            objectID: 'article_1',
            order: '1',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const record2: IRecord = {
            codename: 'article',
            content: 'Hello world! 2',
            heading: 'World',
            id: '123',
            objectID: 'article_2',
            order: '2',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello',
            isCodeSample: false
        };
        const record3: IRecord = {
            codename: 'article',
            content: 'Hello world!',
            heading: 'World',
            id: '123',
            objectID: 'article_1',
            order: '1',
            platforms: [],
            section: Section.Tutorials,
            title: 'Hello world!',
            isCodeSample: false
        };
        const recordsFromBlob = [
            record,
            record2,
        ];
        const recordsFromAlgolia = [record3];

        const {
            recordsToDelete,
            recordsToIndex,
        } = diffRecords(recordsFromBlob, recordsFromAlgolia);

        expect(recordsToIndex).toStrictEqual([record, record2]);
        expect(recordsToDelete).toStrictEqual([]);
    });
});
