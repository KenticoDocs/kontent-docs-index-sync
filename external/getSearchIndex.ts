import {
    Client,
    Index,
} from 'algoliasearch';
import * as algoliasearch from 'algoliasearch';
import { Configuration } from './configuration';

export const getSearchIndex = (): Index =>
    getSearchClient().initIndex(Configuration.keys.searchIndexName);

const getSearchClient = (): Client =>
    algoliasearch(Configuration.keys.searchAppId, Configuration.keys.searchAdminApiKey);
