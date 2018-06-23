import * as http from 'http';

const healthcheck = (req: http.IncomingMessage , res: http.OutgoingMessage) => {
    res.write(req.url);
    return res.end('Healthcheck done...');
};




