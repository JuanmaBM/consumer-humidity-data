import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as Consumer from './event/consumer.event';
import * as Amqp from 'amqp-ts';

import { AmqpClientFactory } from './event/AmqpClient';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 8080;

var connection = AmqpClientFactory.build("192.168.100.86:5672", "consumer", "consumerpass");
var consumer: Consumer.consumer = new Consumer.consumer(connection);
consumer.consume('humidity', (message: Amqp.Message)  => console.info(message));

app.use(bodyparser.json())
app.route('/health')
    .get((req: express.Request, res: express.Response) => {
        res.status(200).send('{"status":"UP"}');
    });

server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});