import {
    AzureFunction,
    Context,
    HttpRequest,
} from '@azure/functions'
import { Configuration } from '../external/configuration';
import { clearIndex } from '../external/searchIndex';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        Configuration.set(req.query.isTest === 'enabled');
        await clearIndex(req.query.section);
    } catch (error) {
        /** This try-catch is required for correct logging of exceptions in Azure */
        throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
    }
};

export default httpTrigger;
