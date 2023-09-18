import { WeatherSensorsAPI } from "../datasources/weather-sensors-api";
import { getSensorValue } from "./utils";

export const latestSDS011 = async (
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
};
