import * as Influx from 'influx';
import dotenv from 'dotenv';

dotenv.config();

const HOST: string = process.env.INFLUXDB_HOST ? process.env.INFLUXDB_HOST : 'localhost';
const DATABASE: string = process.env.INFLUXDB_DATABASE ? process.env.INFLUXDB_DATABASE : 'default';
const USERNAME: string = process.env.INFLUXDB_USERNAME ? process.env.INFLUXDB_USERNAME : ''
const PASSWORD: string = process.env.INFLUXDB_PASSWORD ? process.env.INFLUXDB_PASSWORD : ''

class InfluxDBClient {

    private static instance: InfluxDBClient;
    private influx: Influx.InfluxDB;

    constructor() {
        this.influx = this.connect(HOST, DATABASE, USERNAME, PASSWORD);
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new InfluxDBClient();
        }
        return this.instance;
    }

    getConnection = () => this.influx;

    private connect = (host: string, database: string, username: string, password: string) => {
        return new Influx.InfluxDB({
            username: username,
            password: password,
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
                ]
              }
            ]
          })
    }

}

export default InfluxDBClient.getInstance();