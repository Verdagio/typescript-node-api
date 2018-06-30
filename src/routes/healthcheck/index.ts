export const healthcheck = (data:object, callback: (statusCode: number, payload?: object) => object):void =>  {
    callback(200, {'name': 'healthcheck'});
} 

