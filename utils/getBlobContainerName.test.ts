import { getBlobContainerName } from './getBlobContainerName';

describe('getBlobContainerName', () => {
    it('gets the name from event correctly', () => {
        const expectedContainerName = 'some-container';
        const eventGridEvent = {
            data: {
                api: 'PutBlockList',
                blobType: 'BlockBlob',
                clientRequestId: '6d79dbfb-0e37-4fc4-981f-442c9ca65760',
                contentLength: 524288,
                contentType: 'text/plain',
                eTag: '0x8D4BCC2E4835CD0',
                requestId: '831e1650-001e-001b-66ab-eeb76e000000',
                sequencer: '00000000000004420000000000028963',
                storageDiagnostics: {
                    batchId: 'b68529f3-68cd-4744-baa4-3c0498ec19f0',
                },
                url: 'https://example.blob.core.windows.net/testcontainer/testfile.txt',
            },
            dataVersion: '',
            eventTime: new Date('2017-06-26T18:41:00.9584103Z'),
            eventType: 'Microsoft.Storage.BlobCreated',
            id: '831e1650-001e-001b-66ab-eeb76e069631',
            metadataVersion: '1',
            subject: `/blobServices/default/containers/${expectedContainerName}/blobs/testfile.txt`,
            topic: '/subscriptions/{subscription-id}/resourceGroups/Storage/providers/Microsoft.Storage' +
                '/storageAccounts/xstoretestaccount',
        };

        const containerName = getBlobContainerName(eventGridEvent);

        expect(containerName).toEqual(expectedContainerName);
    });
});
