import * as http from 'http';
import * as url from 'url';
import { healthcheck as healthcheck } from './healthcheck';

export const handlerNotfound = (data: object, callback: (statusCode: number, payload?: object) => object)=>{
    callback(404, {'name': 'handlerNotFound'});
} 

export const routes = {
    'get': (s: string)=>{
        return this.s;
    },
    'healthcheck': healthcheck
};