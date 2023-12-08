import { ScrollView, View } from "react-native";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const TopCategoriesChart = ({ data }) => {
  return (
    <ScrollView>
      <View>
        <BarChart data={data} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"amount"} fill={"dodgerblue"} />
        </BarChart>
      </View>
    </ScrollView>
  );
};

export default TopCategoriesChart;
