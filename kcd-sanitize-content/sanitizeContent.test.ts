import { sanitizeContent } from './sanitizeContent';

describe('sanitizeContent', () => {
    it('should replace icons and special characters', () => {
        const expectedContent = '<& some text after component >';
        const content = '&lt;&amp; {~some text~} after\n component{@icon-check@} {~ {@icon-calendar@}{@icon-copy@}' +
            ' {@icon-codename@}  &gt;{@icon-content-and-assets@} ~}       {@icon-light-bulb@}{@icon-cancel@}';

        const actualContent = sanitizeContent(content);

        expect(actualContent).toEqual(expectedContent);
    });

    it('should leave normal text unchanged', () => {
        const expectedContent = 'Hello this is standard text that shouldn\'t be modified';
        const content = 'Hello this is standard text that shouldn\'t be modified';

        const actualContent = sanitizeContent(content);

        expect(actualContent).toEqual(expectedContent);
    });

    it('should return empty string when given empty string', () => {
        const expectedContent = '';
        const content = '';

        const actualContent = sanitizeContent(content);

        expect(actualContent).toEqual(expectedContent);
    });
});
