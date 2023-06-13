import dayjs from "dayjs";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useStats } from "./use-stats";

const Stats = () => {
  const stats = useStats();

  return (
    <div>
      <div>
        <LineChart width={1680} height={400} data={stats}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => {
              const date = dayjs.unix(timestamp);
              return `${date.date()} ${date.format("MMM")}`;
            }}
          />
          <YAxis dataKey="temperature" />
        </LineChart>
        <LineChart width={1680} height={400} data={stats}>
          <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => {
              const date = dayjs.unix(timestamp);
              return `${date.date()} ${date.format("MMM")}`;
            }}
          />
          <YAxis dataKey="humidity" />
        </LineChart>
      </div>
    </div>
  );
};

export default Stats;
