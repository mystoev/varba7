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
      parent: any,
      args: any,
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
      parent: any,
      args: any,
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
    periodicSDS011: () => {
      return [
        {
          timestamp: 123,
          pm25: 3.5,
          pm10: 9,
        },
      ];
    },
    periodicBME280: () => {
      return [
        {
          timestamp: 123,
          temperature: 12.34,
          humidity: 18.3,
        },
      ];
    },
  },
};

export default resolvers;
