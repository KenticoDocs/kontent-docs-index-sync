import {
    SearchClient,
    SearchIndex,
} from 'algoliasearch';
import * as algoliasearch from 'algoliasearch';
import { Configuration } from 'kontent-docs-shared-code';

export const getSearchIndex = (): SearchIndex =>
    getSearchClient().initIndex(Configuration.keys.searchIndexName);

const getSearchClient = (): SearchClient =>

    algoliasearch.default(Configuration.keys.searchAppId, Configuration.keys.searchAdminApiKey);
