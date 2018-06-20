import * as http from 'http';

const healthcheck = (req: http.IncomingMessage, res: http.OutgoingMessage) => {
    res.end(200);
}


