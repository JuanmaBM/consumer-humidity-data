import { Message } from "amqp-ts";
import { HumidityDto } from "../dto/humidity.dto";

class RabbitmqHumidityConverterMiddleware {

    private static instance: RabbitmqHumidityConverterMiddleware;

    static getInstance() {
        if (!this.instance) {
            this.instance = new RabbitmqHumidityConverterMiddleware();
        }
        return this.instance;
    }

    async map(message: Message): Promise<HumidityDto> {
        let content: string = message?.getContent();
        return JSON.parse(content);
    }

}

export default RabbitmqHumidityConverterMiddleware.getInstance();