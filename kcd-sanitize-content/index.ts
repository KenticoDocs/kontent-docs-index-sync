import {
    AzureFunction,
    Context,
    HttpRequest,
} from '@azure/functions';
import { sanitizeContent } from './sanitizeContent';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        if (req.body.content) {
            context.res = {
                body: JSON.stringify(sanitizeContent(req.body.content)),
            };
        } else {
            context.res = {
                body: 'Please pass the content in the request body',
                status: 400,
            };
        }
    } catch (error) {
        /** This try-catch is required for correct logging of exceptions in Azure */
        throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
    }
};

export default httpTrigger;
