import dayjs from "dayjs";
import { orderBy } from "lodash";

const startMonth = "20230501";
const today = dayjs();
export const todayFormatted = today.format("YYYYMM") + "01";

export const calculateMonths = () => {
  const nextMonth = today.add(1, "month").format("YYYYMM");
  const availableMonths = [];

  let month = dayjs(startMonth);
  while (month.format("YYYYMM") != nextMonth) {
    availableMonths.push(month);

    month = month.add(1, "month");
  }

  return orderBy(availableMonths, ["$d"], ["desc"]);
};
