import { IEventGridEvent } from '../external/models';

export const getBlobContainerName = (eventGridEvent: IEventGridEvent): string => {
    const containerNameRegex = /containers\/([\w|-]*)/;
    const matches = eventGridEvent.subject.match(containerNameRegex);

    return matches ? matches[1] : ''
};
