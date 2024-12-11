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
        var influx = InfluxDBClient.getConnection()
        influx.writePoints([
            {
              measurement: 'humidity_data',
              fields: humidityData
            }
          ]).catch(reason => {
            console.error("An error happened when send write point to influxdb:");
            console.error(reason);
          });
    }

}

export default HumidityInfluxDao.getInstance();