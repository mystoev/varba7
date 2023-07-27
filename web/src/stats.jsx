import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useStats } from "./use-stats";

const Chart = ({ data, field }) => (
  <BarChart width={640} height={400} data={data}>
    <Bar type="monotone" dataKey={field} stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis
      dataKey="timestamp"
      tickFormatter={(timestamp) => {
        const date = dayjs.unix(timestamp);
        return `${date.date()} ${date.format("MMM")}`;
      }}
    />
    <YAxis dataKey={field} />
    <Tooltip labelFormatter={() => ""} />
  </BarChart>
);

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
};

const startMonth = "20230501";
const calculateMonths = () => {
  const today = dayjs().add(1, "month").format("YYYYMM");
  const availableMonths = [];

  let nextMonth = dayjs(`${startMonth}`);
  while (nextMonth.format("YYYYMM") != today) {
    availableMonths.push(nextMonth);

    nextMonth = nextMonth.add(1, "month");
  }

  return availableMonths;
};

const months = calculateMonths();

const Stats = () => {
  const [monthFilter, setMonthFilter] = useState(startMonth);
  const stats = useStats(monthFilter);

  return (
    <div>
      <select onChange={({ target: { value } }) => setMonthFilter(value)}>
        {months.map((month) => {
          return (
            <option key={month} value={dayjs(month).format("YYYYMMDD")}>
              {dayjs(month).format("MMM YY")}
            </option>
          );
        })}
      </select>
      <h1>Temperature</h1>
      <Chart data={stats} field={"temperature"} />
      <h1>Humidity</h1>
      <Chart data={stats} field={"humidity"} />
    </div>
  );
};

export default Stats;
