import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
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
import { GET_PERIODIC_BME280 } from "./shared/queries/periodic-bme280";
import {
  averageTemperatures,
  maxTemperatures,
} from "./shared/selectors/temperature";

const Chart = ({ startDate, endDate }) => {
  const { data } = useQuery(GET_PERIODIC_BME280, {
    variables: { startDate, endDate },
  });

  if (!data) {
    return null;
  }

  const maxTemps = maxTemperatures(data.periodicBME280, startDate, endDate);
  const avgTemps = averageTemperatures(data.periodicBME280, startDate, endDate);

  return (
    <View style={{ margin: 10 }}>
      <ResponsiveContainer width="100%" aspect={1.0 / 0.4}>
        <BarChart data={maxTemps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(item) => format(item, "dd-MMM")}
          />
          <YAxis />
          <Tooltip labelFormatter={(item) => format(item, "dd MMM, HH:mm")} />
          <Bar dataKey={"temperature"} fill={"orangered"} />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" aspect={1.0 / 0.4}>
        <BarChart data={avgTemps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(item) => format(item, "dd-MMM")}
          />
          <YAxis />
          <Tooltip labelFormatter={(item) => format(item, "dd MMM")} />
          <Bar dataKey={"temperature"} fill={"green"} />
        </BarChart>
      </ResponsiveContainer>
    </View>
  );
};

export default Chart;
