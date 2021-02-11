import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());
app.route('/health')
    .get((req: express.Request, res: express.Response) => {
        res.status(200).send('{"status":"UP"}');
    });

server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
});