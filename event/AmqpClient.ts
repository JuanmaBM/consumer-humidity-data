import { Connection } from 'amqp-ts';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();

const HOST: string = process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST : "localhost:5672";
const USERNAME: string | undefined = process.env.RABBITMQ_USER_NAME;
const PASSWORD: string | undefined = process.env.RABBITMQ_USER_PASSWORD;

class AmqpClient {

    private static instance: AmqpClient;
    private connection: Connection | undefined;

    constructor() {
        this.build(HOST, USERNAME, PASSWORD)
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AmqpClient();
        }
        return this.instance;
    }

    getConnection() {
        return this.connection;
    }

    private build(host: string, username?: string, password?: string) {

        let connectionString: string = "amqp://";

        if (username && password) {
            connectionString = connectionString.concat(`${username}:${password}@`);
        }

        connectionString = connectionString.concat(host);
        this.connection = new Connection(connectionString)
            .on('error_connection', err => debug.log(err))
            .on('trying_connect', () => debug.log("Trying connect ..."))
            .on('open_connection', () => debug.log(`Opening AMQP connection to ${host}`));
    }
}

export default AmqpClient.getInstance();