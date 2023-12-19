import { View } from "react-native";
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
    <View>
      <ResponsiveContainer width="100%" aspect={1.0 / 0.4}>
        <BarChart data={data} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"amount"} fill={"dodgerblue"} />
        </BarChart>
      </ResponsiveContainer>
    </View>
  );
};

export default TopCategoriesChart;
