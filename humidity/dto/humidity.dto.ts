export class HumidityDto {
    humidity: number;
    temperature: number;
    sensor: string;

    constructor() {
        this.humidity = 0.0;
        this.temperature = 0.0;
        this.sensor = "";
    }
}