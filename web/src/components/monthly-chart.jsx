import dayjs from "dayjs";
import PropTypes from "prop-types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyChart = ({ data, field, fill }) => (
  <ResponsiveContainer width="90%" height={200}>
    <BarChart data={data}>
      <Bar type="monotone" dataKey={field}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={fill(entry)} />
        ))}
      </Bar>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(timestamp) => {
          const date = dayjs.unix(timestamp);
          return date.format("DD MMMM");
        }}
      />
      <YAxis dataKey={field} />
      <Tooltip
        labelFormatter={(value) => dayjs.unix(value).format("DD MMM HH:mm")}
      />
    </BarChart>
  </ResponsiveContainer>
);

MonthlyChart.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  fill: PropTypes.func,
};

export default MonthlyChart;
