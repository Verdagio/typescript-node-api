import * as http from 'http';
import * as assert from 'assert';

import { server as api } from '../../src/server'

describe('Healthcheck', () => {
    describe('GET /healthcheck', () => {
        it("should respond with a HTTP 200 OK", done => {
            http.get('http://127.0.0.1:9000/healthcheck', res => {
                assert.strictEqual(res.statusCode, 200);
            });
        });
    });
    after(() => api.close())
});