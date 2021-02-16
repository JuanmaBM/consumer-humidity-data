import Amqp from 'amqp-ts';
import debug from 'debug';

export class AmqpClientFactory {

    static build(host: string, username?: string, password?: string) {

        let connectionString: string = "amqp://";

        if (username && password) {
            connectionString = connectionString.concat(`${username}:${password}@`);
        }

        connectionString = connectionString.concat(host);
        return new Amqp.Connection(connectionString)
            .on('error_connection', err => debug.log(err))
            .on('trying_connect', () => debug.log("Trying connect ..."))
            .on('open_connection', () => debug.log(`Opening connection to ${host}`));
    }
}