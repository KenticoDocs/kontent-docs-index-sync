import { IBlobEventGridEvent } from 'cloud-docs-shared-code';

export const getBlobContainerName = (eventGridEvent: IBlobEventGridEvent): string => {
    const containerNameRegex = /containers\/([\w|-]*)/;
    const matches = eventGridEvent.subject.match(containerNameRegex);

    return matches ? matches[1] : ''
};
