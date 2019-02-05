import { healthcheck as healthcheck } from './healthcheck';
import { sample as sample } from './example'
import { Data } from '../model/data-type';

export const handlerNotfound = (data: Data, callback: (statusCode: number, payload?: object) => object) => {
    callback(404, { 
            'name': 'handlerNotFound',
            'message': `path ${data.trimmedPath}/ not found` 
            });
}

export const routes: object = {
    'healthcheck': healthcheck,
    'sample': sample.routes
};