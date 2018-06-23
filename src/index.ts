import * as config from 'config';
import * as http from 'http';
import * as url from 'url';
import { StringDecoder as StringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';
import { ParsedPath } from 'path';

const port = config.get('Server.port');
const decoder = new StringDecoder('utf-8');



export const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.OutgoingMessage) => {
    // Parse URL's
    const parsedUrl: url.UrlWithParsedQuery = url.parse(request.url, true);

    // Get Paths
    const path: String = parsedUrl.pathname;
    const trimmedPath: String = path.replace(/^\/+|\/+$/g,''); // Get a clean url 

    // get query string object
    const queryStringObj: ParsedUrlQuery = parsedUrl.query;

    // get the http method
    const method: String = request.method.toLowerCase();

    //Get the headers
    const headers: http.IncomingHttpHeaders = request.headers;

    //get the payload
    let payload: String = '';
    let buffer: http.IncomingMessage = request.on('data', (data: Buffer) => {
        payload += decoder.write(data);
    });
    buffer = request.on('end', () => {
        payload += decoder.end();

        //send response
        response.end('\nQuery Success...\n');

        //log request path
        console.log('payload: ', payload);
    });

}).listen(port, (error: Error) => {
        if(error){
            return console.log('An error occured', error);
        }
        console.log(`Server listening on port ${port}`);
});






