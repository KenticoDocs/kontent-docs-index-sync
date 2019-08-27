export interface IEventGridEvent {
    id: string;
    topic?: string;
    subject: string;
    data: any;
    eventType: string;
    eventTime: Date;
    readonly metadataVersion?: string;
    dataVersion: string;
}
