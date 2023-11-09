import { PeriodicBME280Data } from "../datasources/bme280-stats";

export const monthsWithData = (
  _: any,
  __: any,
  {
    dataSources: { bme280Stats },
  }: { dataSources: { bme280Stats: PeriodicBME280Data } }
) => {
  return bme280Stats.monthsWithData();
};
