import { KeyValueCache } from "apollo-server-caching";
import { BME280 } from "../models/mongo";

const msTillNextHour = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hours = now.getHours() + 1;

  const nextHour = new Date(`${year}-${month}-${date} ${hours}:`);

  return +nextHour - +now;
};

export class PeriodicBME280Data {
  private cache: KeyValueCache<string>;

  constructor({ cache }: { cache: KeyValueCache<string> }) {
    this.cache = cache;
  }

  async periodicBME280(startDate: number, endDate: number) {
    // const cacheKey = `BME280-${startDate}-${endDate}`;
    // const cacheObject = await this.cache.get(cacheKey);
    // if (cacheObject) {
    //   return JSON.parse(cacheObject);
    // }

    const result = await BME280.find({
      timestamp: { $gt: startDate, $lt: endDate },
    });

    // this.cache.set(cacheKey, JSON.stringify(result), { ttl: msTillNextHour() });

    return result;
  }

  async monthsWithData() {
    const timestampToDate = {
      $toDate: { $multiply: [{ $toLong: "$timestamp" }, 1000] },
    };

    const result = await BME280.aggregate([
      {
        $group: {
          _id: {
            $month: timestampToDate,
          },
          month: {
            $first: timestampToDate,
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result.map(({ month }) => new Date(month).toISOString());
  }
}
