import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { orderBy } from "lodash";
import "./stats.css";
import { useStats } from "./use-stats";

const calculateTemperatureColor = ({ temperature = 0 }) => {
  var color1_red = 0;
  var color1_green = 255;
  var color1_blue = 255;

  var color2_red = 255;
  var color2_green = 0;
  var color2_blue = 0;

  let percent = temperature / 45.0;

  let resultRed = color1_red + percent * (color2_red - color1_red);
  let resultGreen = color1_green + percent * (color2_green - color1_green);
  let resultBlue = color1_blue + percent * (color2_blue - color1_blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};

const calculateHumidityColor = ({ humidity = 0 }) => {
  var color1_red = 255;
  var color1_green = 255;
  var color1_blue = 255;

  let percent = humidity / 100.0;

  let resultRed = color1_red + percent * (0 - color1_red);
  let resultGreen = color1_green + percent * (0 - color1_green);
  let resultBlue = color1_blue + percent * (0 - color1_blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};

const Chart = ({ data, field, fill }) => (
  <ResponsiveContainer width="90%" height={400}>
    <BarChart data={data}>
      <Bar type="monotone" dataKey={field}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={fill(entry)} />
        ))}
      </Bar>
      <CartesianGrid vertical={false} />
      <Legend verticalAlign="top" height={36} />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(timestamp) => {
          const date = dayjs.unix(timestamp);
          return date.format("DD MMMM");
        }}
      />
      <YAxis dataKey={field} />
      <Tooltip labelFormatter={(value) => dayjs.unix(value).format("DD MMM")} />
    </BarChart>
  </ResponsiveContainer>
);

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  fill: PropTypes.func,
};

const startMonth = "20230501";
const today = dayjs();
const todayFormatted = today.format("YYYYMM") + "01";
const calculateMonths = () => {
  const nextMonth = today.add(1, "month").format("YYYYMM");
  const availableMonths = [];

  let month = dayjs(startMonth);
  while (month.format("YYYYMM") != nextMonth) {
    availableMonths.push(month);

    month = month.add(1, "month");
  }

  return orderBy(availableMonths, ["$d"], ["desc"]);
};

const months = calculateMonths();

const Stats = () => {
  const [monthFilter, setMonthFilter] = useState(todayFormatted);
  const stats = useStats(monthFilter);

  return (
    <div>
      <h1>Varba7 Weather Stats</h1>
      <Select
        onChange={({ target: { value } }) => setMonthFilter(value)}
        defaultValue={todayFormatted}
      >
        {months.reverse().map((month) => {
          return (
            <MenuItem key={month} value={dayjs(month).format("YYYYMMDD")}>
              {dayjs(month).format("MMMM YYYY")}
            </MenuItem>
          );
        })}
      </Select>
      <div className="charts-container">
        <Chart
          data={stats}
          field={"temperature"}
          fill={calculateTemperatureColor}
        />
        <Chart data={stats} field={"humidity"} fill={calculateHumidityColor} />
      </div>
    </div>
  );
};

export default Stats;
