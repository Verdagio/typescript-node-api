import * as http from 'http';

export const healthcheck = (req: http.IncomingMessage, res: http.OutgoingMessage) => {
    res.end(200);
}