import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as dotenv from 'dotenv';

import express from 'express';
import { Consumer } from './common/event/consumer.event';

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 8080;

var consumer: Consumer = new Consumer('humidity');
consumer.start(message  => console.info(message));

app.use(bodyparser.json())
app.route('/health')
    .get((req: express.Request, res: express.Response) => {
        res.status(200).send('{"status":"UP"}');
    });

server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});