import * as Amqp from 'amqp-ts';
import debug from 'debug';

export class consumer {

    private debugLog: debug.IDebugger = debug('consumer');
    private connection: Amqp.Connection;
    private DEFAULT_CONSUMER_FUNCTION = (message: Amqp.Message) =>
        console.log("Message received: " + message.getContent());
    

    constructor(connection: Amqp.Connection) {
        this.connection = connection;
    }

    public consume(queue: string, consumerFunction?: (msg: Amqp.Message) => any) {
        this.connection.declareQueue(queue)
            .activateConsumer(consumerFunction ? consumerFunction : this.DEFAULT_CONSUMER_FUNCTION);
    }

}