export const healthcheck = (data:object, callback: (statusCode: number, payload?: object) => object) => {
    callback(200, {'name': 'healthcheck'});
} 

