import { format } from "date-fns";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data }) => {
  return (
    <BarChart data={data} width={800} height={400}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(item) => format(item, "dd-MMM")}
      />
      <YAxis />
      <Tooltip labelFormatter={(item) => format(item, "dd MMM, HH:mm")} />
      <Bar dataKey={"temperature"} fill={"red"} />
    </BarChart>
  );
};

export default Chart;
