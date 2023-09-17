import { Stats as StatsModel } from "../models/mongo";

export class Stats {
  periodicBME280(startDate: string, endDate: string) {
    const $gt = new Date(startDate).getTime() / 1000;
    const $lt = new Date(endDate).getTime() / 1000;

    return StatsModel.find({
      timestamp: { $gt, $lt },
    });
  }
}
