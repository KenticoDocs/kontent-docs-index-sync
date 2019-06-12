export interface IRecord {
    readonly content: string;
    readonly id: string;
    readonly title: string;
    readonly heading: string;
    readonly codename: string;
    readonly order: string;
    readonly objectID: string;
    readonly platforms: string[];
    readonly section: string;
}

export interface IBlob {
    readonly codename: string;
    readonly id: string;
    readonly initialize: boolean;
    readonly itemRecords: IRecord[];
}

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
