import {
    IRecord,
    Section,
} from 'kontent-docs-shared-code';
import { sanitizeRecords } from './sanitizeRecords';

const notModifiedContent = 'Hello this is standard text that shouldn\'t be modified';

describe.each([
    [
        '&lt;&amp; {~some text~} after\n component{@icon-check@} {~ {@icon-calendar@}{@icon-copy@}' +
        ' {@icon-codename@}  &gt;{@icon-content-and-assets@} ~}       {@icon-light-bulb@}{@icon-cancel@}',
        '&lt;&amp; {~some text~} after\n component{@icon-check@} {~ {@icon-calendar@}&nbsp;',
        '<& some text after component >',
        '<& some text after component',
    ],
    [
        notModifiedContent,
        notModifiedContent,
        notModifiedContent,
        notModifiedContent,
    ],
    [
        '',
        '',
        '',
        '',
    ]])
('sanitizeRecords', (content, heading, expectedContent, expectedHeading) => {
    it('should replace icons and special characters', () => {
        const commonAttributes = {
            codename: 'codename',
            id: '1',
            objectID: '1',
            order: '2',
            platforms: [],
            section: Section.Api,
            title: 'Title',
        };
        const record: IRecord = {
            ...commonAttributes,
            content,
            heading,
            isCodeSample: false
        };
        const expectedRecord: IRecord = {
            ...commonAttributes,
            content: expectedContent,
            heading: expectedHeading,
            isCodeSample: false
        };
        const recordsToSanitize = [record];
        const expectedRecords = [expectedRecord];

        const sanitizedRecords = sanitizeRecords(recordsToSanitize);

        expect(sanitizedRecords).toEqual(expectedRecords);
    });
});
