import { WeatherSensorsAPI } from "../datasources/weather-sensors-api";
import { Timestamp } from "./timestamp-scalar";

const resolvers = {
  Timestamp,
  Query: {
    latestSDS001: () => ({
      timestamp: new Date(),
      pm10: 3.5,
      pm25: 1.2,
    }),
    latestBME280: async (
      parent: any,
      args: any,
      {
        dataSources: { weatherSensorsAPI },
      }: { dataSources: { weatherSensorsAPI: WeatherSensorsAPI } }
    ) => {
      const [{ timestamp, sensordatavalues }] =
        await weatherSensorsAPI.getBME280Info();

      const temperature = sensordatavalues.find(
        (val: any) => val.value_type === "temperature"
      ).value;
      const humidity = sensordatavalues.find(
        (val: any) => val.value_type === "humidity"
      ).value;

      return { timestamp, temperature, humidity };
    },
  },
};

export default resolvers;
