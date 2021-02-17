import * as Influx from 'influx';
import dotenv from 'dotenv';

dotenv.config();

const HOST: string = process.env.INFLUXDB_HOST ? process.env.INFLUXDB_HOST : 'localhost';
const DATABASE: string = process.env.INFLUXDB_DATABASE ? process.env.INFLUXDB_DATABASE : 'default';

class InfluxDBClient {

    private static instance: InfluxDBClient;
    private influx: Influx.InfluxDB;

    constructor() {
        this.influx = this.connect(HOST, DATABASE);
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new InfluxDBClient();
        }
        return this.instance;
    }

    getConnection = () => this.influx;

    private connect = (host: string, database: string) => {
        return new Influx.InfluxDB({
            host: host,
            database: database,
            schema: [
              {
                measurement: 'humidity_data',
                fields: {
                  humidity: Influx.FieldType.FLOAT,
                  temperature: Influx.FieldType.FLOAT,
                  sensor: Influx.FieldType.STRING
                },
                tags: [
                  'iot'
                ]
              }
            ]
          })
    }

}

export default InfluxDBClient.getInstance();