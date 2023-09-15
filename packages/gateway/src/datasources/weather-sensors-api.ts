import { RESTDataSource } from "@apollo/datasource-rest";

export class WeatherSensorsAPI extends RESTDataSource {
  baseURL = "https://data.sensor.community/airrohr/v1/sensor/";

  getSDS001Info() {
    return this.get("11681/");
  }

  getBME280Info() {
    return this.get("11682/");
  }
}
