import { PeriodicBME280Data } from "../datasources/bme280-stats";

export const periodicBME280 = async (
  _: any,
  { startDate, endDate }: { startDate: string; endDate: string },
  {
    dataSources: { bme280Stats },
  }: { dataSources: { bme280Stats: PeriodicBME280Data } }
) => {
  const startTimestamp = new Date(startDate).getTime() / 1000;
  const endTimestamp = new Date(endDate).getTime() / 1000;

  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    throw Error("GraphQL could not convert string to Date");
  }

  const result = await bme280Stats.periodicBME280(startTimestamp, endTimestamp);

  return result;
};
