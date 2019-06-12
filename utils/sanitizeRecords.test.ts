import { IRecord } from '../external/models';
import {
    sanitizeRecords,
} from './sanitizeRecords';

describe.each([
    [
        '&lt;&amp; {~some text~} after\n component{@icon-check@} {~ {@icon-calendar@}{@icon-copy@}' +
        ' {@icon-codename@}  &gt;{@icon-content-and-assets@} ~}       {@icon-light-bulb@}{@icon-cancel@}',
        '<& some text after component >',
    ],
    [
        'Hello this is standard text that shouldn\'t be modified',
        'Hello this is standard text that shouldn\'t be modified',
    ],
    [
        '',
        '',
    ]])
('sanitizeRecords', (content, expectedContent) => {
    it('should replace icons and special characters', () => {
        const commonAttributes = {
            codename: 'codename',
            heading: '',
            id: '1',
            objectID: '1',
            order: '2',
            platforms: [],
            section: 'api_reference',
            title: 'Title',
        };
        const record: IRecord = {
            ...commonAttributes,
            content,
        };
        const expectedRecord: IRecord = {
            ...commonAttributes,
            content: expectedContent,
        };
        const recordsToSanitize = [record];
        const expectedRecords = [expectedRecord];

        const sanitizedRecords = sanitizeRecords(recordsToSanitize);

        expect(sanitizedRecords).toEqual(expectedRecords);
    });
});
