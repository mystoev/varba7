import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TopCategoriesChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" aspect={1.0 / 0.4}>
        <BarChart data={data} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"amount"} fill={"dodgerblue"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCategoriesChart;
