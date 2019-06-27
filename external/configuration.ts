interface IConfiguration {
    readonly azureAccountName: string;
    readonly azureStorageKey: string;
    readonly searchAdminApiKey: string;
    readonly searchAppId: string;
    readonly searchIndexName: string;
}

export class Configuration {
    public static keys = {} as IConfiguration;

    public static set = (isTest: boolean) => {
        Configuration.keys = {
            azureAccountName: Configuration.getEnvironmentVariable('Azure.StorageAccountName'),
            azureStorageKey: Configuration.getEnvironmentVariable('Azure.StorageKey'),
            searchAdminApiKey: Configuration.getEnvironmentVariable('Search.ApiKey', isTest),
            searchAppId: Configuration.getEnvironmentVariable('Search.AppId', isTest),
            searchIndexName: Configuration.getEnvironmentVariable('Search.IndexName', isTest),
        }
    };

    private static getEnvironmentVariable = (variableName: string, isTest?: boolean): string =>
        process.env[`${variableName}${isTest ? '.Test' : ''}`] || '';
}
