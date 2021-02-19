import {
    AzureFunction,
    Context,
    HttpRequest,
} from '@azure/functions'
import { Configuration } from 'kontent-docs-shared-code';
import { clearIndex } from '../external/searchIndex';

export const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const isTest = req.query.isTest === 'enabled';

        Configuration.set(isTest);

        const section = req.query && req.query.section;
        const id =  req.query.id;

        if (section) {
            await clearIndex(section, id);
            context.res = {
                status: 200,
                body: `Test: ${isTest}. Cleared index section '${section}' and id '${id}'`,
            };
            return;
        }

        context.res = {
            status: 200,
            body: `Test: ${isTest}. No section was specified, therefore no index was cleared.`,
        };

    } catch (error) {
        /** This try-catch is required for correct logging of exceptions in Azure */
        throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
    }
};
