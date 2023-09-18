import { WeatherSensorsAPI } from "../datasources/weather-sensors-api";
import { getSensorValue } from "./utils";

export const latestBME280 = async (
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
};
