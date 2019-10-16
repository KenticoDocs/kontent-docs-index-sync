import {
    AzureFunction,
    Context,
    HttpRequest,
} from '@azure/functions'
import { Configuration } from 'kontent-docs-shared-code';
import { clearIndex } from '../external/searchIndex';

export const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        Configuration.set(req.query.isTest === 'enabled');
        await clearIndex(req.query.section, req.query.id);
    } catch (error) {
        /** This try-catch is required for correct logging of exceptions in Azure */
        throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
    }
};
