import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useStats } from "./use-stats";

const Chart = ({ data, field }) => (
  <BarChart width={1680} height={400} data={data}>
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

const Stats = () => {
  const stats = useStats();

  return (
    <div>
      <Chart data={stats} field={"temperature"} />
      <Chart data={stats} field={"humidity"} />
    </div>
  );
};

export default Stats;
