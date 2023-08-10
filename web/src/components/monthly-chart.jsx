import dayjs from "dayjs";
import PropTypes from "prop-types";
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

const MonthlyChart = ({ data, field, fill }) => (
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

MonthlyChart.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  fill: PropTypes.func,
};

export default MonthlyChart;
