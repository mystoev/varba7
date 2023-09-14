import { Stats } from "../db/models";

export const latest = async () => {
  const result = await Stats.find().sort({ timestamp: -1 }).limit(1);
  return result;
};
