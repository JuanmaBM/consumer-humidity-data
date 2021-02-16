import { Message } from 'amqp-ts';
import AmqpClient from './AmqpClient';

export class Consumer {

    private queue: string;
    private DEFAULT_CONSUMER_FUNCTION = (message: Message) =>
        console.log("Message received: " + message.getContent());
    

    constructor(queue: string) {
        this.queue = queue;
    }

    public start(consumerFunction?: (msg: Message) => any) {
        AmqpClient.getConnection()?.declareQueue(this.queue)
            .activateConsumer(consumerFunction ? consumerFunction : this.DEFAULT_CONSUMER_FUNCTION);
    }

}