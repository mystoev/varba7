import { add, format, parse } from "date-fns";
import { useState } from "react";

import Chart from "../../chart";
import { MonthDropdown } from "../../month-dropdown";

const start = new Date();
const START_MONTH = format(start, "yyyy-MM") + "-1";

const end = start.setMonth(start.getMonth() + 1);
const END_MONTH = format(end, "yyyy-MM") + "-1";

export const BME280Page = () => {
  const [startDate, setStartDate] = useState(START_MONTH);
  const [endDate, setEndDate] = useState(END_MONTH);

  return (
    <div>
      <MonthDropdown
        selectedMonth={format(
          parse(startDate, "yyyy-MM-dd", new Date()),
          "MMM yyyy"
        )}
        onSelectItem={(month) => {
          const sD = format(month, "yyyy-MM") + "-1";
          setStartDate(sD);

          const nextMonth = add(month, { months: 1 });
          const eD = format(nextMonth, "yyyy-MM") + "-1";
          setEndDate(eD);
        }}
      />
      <Chart startDate={startDate} endDate={endDate} />
    </div>
  );
};
