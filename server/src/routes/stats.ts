import dayjs from "dayjs";
import { Stats } from "../db/models";

export const stats = async (month: string) => {
  const result = await Stats.find();
  return result.filter((stat) => {
    const date = dayjs.unix(stat.timestamp);
    return date.format("YYYYMM") === month;
  });
};
