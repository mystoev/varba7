import { format, parseISO } from "date-fns";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExpensesChart = ({ lastYearExpenses }) => {
  const data = lastYearExpenses.map(({ month, amount }) => ({
    month,
    amount: +amount.toFixed(2),
  }));
  data.reverse();

  const average = data
    .map((d) => d.amount)
    .reduce((avg, value, _, { length }) => avg + value / length, 0);

  return (
    <ScrollView>
      <View>
        <BarChart
          data={data}
          width={800}
          height={400}
          style={{ margin: "auto", marginTop: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(item) => format(parseISO(item), "MMM yyyy")}
          />
          <YAxis labelFormatter={(item) => item + "лв"} />
          <Tooltip
            labelFormatter={(item) => format(parseISO(item), "MMM yyyy")}
          />
          <Bar dataKey={"amount"} fill={"royalblue"} />
          <ReferenceLine y={average} stroke="red" label={average.toFixed(2)} />
        </BarChart>
      </View>
    </ScrollView>
  );
};

export default ExpensesChart;
