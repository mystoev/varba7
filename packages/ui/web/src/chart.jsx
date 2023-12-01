import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data }) => {
  return (
    <View>
      <BarChart
        data={data}
        width={800}
        height={400}
        style={{ margin: "auto", marginTop: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(item) => format(item, "dd-MMM")}
        />
        <YAxis />
        <Tooltip labelFormatter={(item) => format(item, "dd MMM, HH:mm")} />
        <Bar dataKey={"temperature"} fill={"orangered"} />
      </BarChart>
    </View>
  );
};

export default Chart;
