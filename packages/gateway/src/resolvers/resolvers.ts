import { PeriodicBME280Data } from "../datasources/bme280-stats";
import { WeatherSensorsAPI } from "../datasources/weather-sensors-api";
import { Timestamp } from "./timestamp-scalar";

const getSensorValue = (sensorData: Array<any>, valueName: String) => {
  const { value } = sensorData.find((val: any) => val.value_type === valueName);
  return value;
};

const resolvers = {
  Timestamp,
  Query: {
    latestSDS011: async (
      _parent: any,
      _args: any,
      {
        dataSources: { weatherSensorsAPI },
      }: { dataSources: { weatherSensorsAPI: WeatherSensorsAPI } }
    ) => {
      const [{ timestamp, sensordatavalues: sensorData }] =
        await weatherSensorsAPI.getSDS011Info();

      const pm25 = getSensorValue(sensorData, "P2");
      const pm10 = getSensorValue(sensorData, "P1");

      return { timestamp, pm25, pm10 };
    },
    latestBME280: async (
      _parent: any,
      _args: any,
      {
        dataSources: { weatherSensorsAPI },
      }: { dataSources: { weatherSensorsAPI: WeatherSensorsAPI } }
    ) => {
      const [{ timestamp, sensordatavalues: sensorData }] =
        await weatherSensorsAPI.getBME280Info();

      const temperature = getSensorValue(sensorData, "temperature");
      const humidity = getSensorValue(sensorData, "humidity");

      return { timestamp, temperature, humidity };
    },
    periodicBME280: async (
      _: any,
      { startDate, endDate }: { startDate: string; endDate: string },
      {
        dataSources: { bme280Stats },
      }: { dataSources: { bme280Stats: PeriodicBME280Data } }
    ) => {
      const result = await bme280Stats.periodicBME280(startDate, endDate);

      return result;
    },
  },
};

export default resolvers;
