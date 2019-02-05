import * as http from 'http';
import { ParsedUrlQuery } from 'querystring';

export type Data = {
    'trimmedPath': string,
    'queryStringObject': ParsedUrlQuery,                       
    'method': string,
    'headers': http.IncomingHttpHeaders,
    'payload': {}
};
