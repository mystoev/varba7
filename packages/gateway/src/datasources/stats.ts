import { KeyValueCache } from "apollo-server-caching";
import { Stats as StatsModel } from "../models/mongo";

const msTillNextHour = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hours = now.getHours() + 1;

  const nextHour = new Date(`${year}-${month}-${date} ${hours}:`);

  return +nextHour - +now;
};

export class Stats {
  private cache: KeyValueCache<string>;

  constructor({ cache }: { cache: KeyValueCache<string> }) {
    this.cache = cache;
  }

  async periodicBME280(startDate: string, endDate: string) {
    const $gt = new Date(startDate).getTime() / 1000;
    const $lt = new Date(endDate).getTime() / 1000;

    const cacheKey = `BME280-${$gt}-${$lt}`;
    const cacheObject = await this.cache.get(cacheKey);
    if (cacheObject) {
      return JSON.parse(cacheObject);
    }

    const result = await StatsModel.find({
      timestamp: { $gt, $lt },
    });

    this.cache.set(cacheKey, JSON.stringify(result), { ttl: msTillNextHour() });

    return result;
  }
}
