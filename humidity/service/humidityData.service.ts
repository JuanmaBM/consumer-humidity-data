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

    insertData = (humidityData: HumidityDto) => HumidityInfluxDao.insert(humidityData);
    
}

export default HumidityDataService.getInstance();