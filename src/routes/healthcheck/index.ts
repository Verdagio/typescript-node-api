// This route will merely verify that the api is reachable & that the router is functioning

export const healthcheck = (callback: (statusCode: number, payload?: object) => object): void => {
    callback(200,{'message' : 'OK'});
}

