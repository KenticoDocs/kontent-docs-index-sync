import {
    AzureFunction,
    Context,
    HttpRequest,
} from '@azure/functions';
import { sanitizeContent } from './sanitizeContent';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    if (req.body.content) {
        context.res = {
            body: sanitizeContent(req.body.content),
        };
    } else {
        context.res = {
            body: 'Please pass the content in the request body',
            status: 400,
        };
    }
};

export default httpTrigger;
