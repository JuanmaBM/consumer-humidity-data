import * as Influx from 'influx';
import InfluxDBClient from '../../common/database/InfluxDBClient.database';
import { HumidityDto } from '../dto/humidity.dto';

class HumidityInfluxDao {

    private static instance: HumidityInfluxDao;

    public static getInstance() {
        if(!this.instance) {
            this.instance = new HumidityInfluxDao();
        }
        return this.instance;
    }

    public insert(humidityData: HumidityDto) {
        InfluxDBClient.getConnection().writePoints([
            {
              measurement: 'humidity_data',
              tags: { host: 'iot' },
              fields: humidityData,
            }
          ]);
    }

}

export default HumidityInfluxDao.getInstance();