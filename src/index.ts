import * as config from 'config';
import * as http from 'http';
import * as url from 'url';
import * as router  from './routes'
import { StringDecoder as StringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';
import { ParsedPath } from 'path';

const port = config.get('Server.port');
const decoder = new StringDecoder('utf-8');

export const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.OutgoingMessage) => {

    // Parse URL's
    const parsedUrl: url.UrlWithParsedQuery = url.parse(request.url, true);
    const trimmedPath: string =  parsedUrl.pathname.replace(/^\/+|\/+$/g,''); // Get a clean url 
    const queryStringObject: ParsedUrlQuery  = parsedUrl.query;
    const method: string = request.method.toLowerCase();
    const headers: http.IncomingHttpHeaders = request.headers;



    let payload: string = '';

    //get the payload
    const buffer: http.IncomingMessage = request.on('data', (data: Buffer) => {
        payload += decoder.write(data);
    }).on('end', () => {
        payload += decoder.end();

        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,                       // get query string object
            'method': method, 
            'headers': headers,
            'payload': payload
        };
        
        const chosenHandler = (router.routes.hasOwnProperty(data.trimmedPath)) ? router.routes.get(data.trimmedPath) : router.handlerNotfound;
        
        chosenHandler({...data, payload}, (statusCode: number, payload: object) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {};

            const payloadString: string = JSON.stringify(payload);

            response.setHeader('statusCode', 200);
            response.end(payloadString);

            console.log('Response returned: ', statusCode, payloadString);
        });
        

    });

}).listen(port, (error: Error) => {
        if(error){
            return console.log('An error occured', error);
        }
        console.log(`Server listening on port ${port}`);
});






