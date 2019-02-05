// Example CRUD implementation of the GenericRoute for guidance purposes
import {Data as  Data } from '../../model/data-type';

export const sample = {
    _routes : {
        get: (data: Data, callback: (statusCode: number, payload?: object) => object) => {
            //use the query string object to get individual item.
            
            callback(200, {'message' : 'successful get'});
        },
        post: (data: Data, callback: (statusCode: number, payload?: object) => object) => {
            //placeholder post
            var tempObject = typeof(data.payload) === 'string' && data.payload.trim().length > 0 ? data.payload.trim() : false;
            if(tempObject){
                callback(200, JSON.parse(tempObject));
            } else {
                callback(500)
            }
        },
        put: (data: Data, callback: (statusCode: number, payload?: object) => object) => {
            //placeholder put
            var tempObject = typeof(data.payload) === 'string' && data.payload.trim().length > 0 ? data.payload.trim() : false;
            if(tempObject){
                callback(200, {'message' : 'Success put'});
            } else {
                callback(500)
            }
        },
        delete: (data: Data, callback: (statusCode: number, payload?: object) => object) => {
            //placeholder delete
            callback(200, {'message' : 'successful delete'});
        },
    },
    routes: (data: Data , callback: (statusCode: number, payload?: object)=>object) => {
        let methods = ['get','post', 'put', 'delete'];
        if(methods.indexOf(data.method.toLowerCase()) > -1){
            sample._routes[data.method](data, callback);
        } else {
            callback(404)
        }
    } 
}






