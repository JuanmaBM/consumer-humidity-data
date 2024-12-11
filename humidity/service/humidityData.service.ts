import { HumidityDto } from "../dto/humidity.dto";
import HumidityInfluxDao from "../dao/humiditydinfluxdao.dao";

class HumidityDataService {

    private static instance: HumidityDataService;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new HumidityDataService();
        }
        return this.instance;
    }

    insertData = (humidityData: HumidityDto) => {
        if (humidityData) HumidityInfluxDao.insert(humidityData);
        else console.error("Data received is wrong");
    }
}

export default HumidityDataService.getInstance();