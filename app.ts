import * as http from 'http';
import express from 'express';

import { Consumer } from './common/event/consumer.event';
import HumidityDataService from './humidity/service/humidityData.service';
import RabbitmqHumidityConverterMiddleware from './humidity/middleware/rabbitmqhumidityconverter.middleware';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 8080;

var consumer: Consumer = new Consumer('humidity');
consumer.start(message  =>
    RabbitmqHumidityConverterMiddleware.map(message)
        .then(humidityDto => HumidityDataService.insertData(humidityDto))
);

app.route('/health')
    .get((req: express.Request, res: express.Response) => {
        res.status(200).send('{"status":"UP"}');
    });

server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});