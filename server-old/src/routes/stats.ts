import dayjs from "dayjs";
import { Stats } from "../db/models";

export const stats = async (month: string) => {
  const start = dayjs(month);
  const end = start.add(1, "month");

  const result = await Stats.find({
    timestamp: { $gt: start.unix(), $lt: end.unix() },
  });
  return result;
};
