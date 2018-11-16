import * as config from 'config';
import * as http from 'http';
import * as url from 'url';
import * as router from './routes'

import { StringDecoder as StringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';

const decoder = new StringDecoder('utf-8');
const env = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'default';

export const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

    // Parse URL's
    const parsedUrl: url.UrlWithParsedQuery = url.parse(request.url, true);
    const trimmedPath: string = parsedUrl.pathname.replace(/^\/+|\/+$/g, ''); // Get a clean url 
    const queryStringObject: ParsedUrlQuery = parsedUrl.query;
    const method: string = request.method.toLowerCase();
    const headers: http.IncomingHttpHeaders = request.headers;

    let userPayload: string = '';

    //get the payload
    const buffer: http.IncomingMessage = request.on('data', (data: Buffer) => {
        userPayload += decoder.write(data);
    }).on('end', () => {
        userPayload += decoder.end();

        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,                       
            'method': method,
            'headers': headers,
            'payload': userPayload
        };

        const chosenHandler = (router.routes.hasOwnProperty(trimmedPath)) ? router.routes[trimmedPath] : router.handlerNotfound;

        chosenHandler( data, (statusCode: number, payload: object) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200;
            payload = typeof (payload) === 'object' ? payload : {};

            const handlerPayload: string = JSON.stringify(payload);

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(handlerPayload);
            console.log('Response returned: ', statusCode, handlerPayload, data.payload);
        });


    });

}).listen(config.get(`${env}.port`), (error: Error) => {
    if (error) {
        return console.log('An error occured', error);
    }
    console.log(`Server ${config.get(`${env}.name`)} listening on port ${config.get(`${env}.port`)}`);
});






