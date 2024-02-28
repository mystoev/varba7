import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GET_PERIODIC_BME280 } from "./queries/periodic-bme280";
import { averageTemperatures, maxTemperatures } from "./selectors/temperature";

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
    <div style={{ margin: 10 }}>
      <p
        style={{
          fontSize: 32,
          color: "black",
          paddingTop: 10,
        }}
      >
        Max Temperatures
      </p>
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
      <p
        style={{
          fontSize: 32,
          color: "black",
          paddingTop: 10,
        }}
      >
        Average Temperatures
      </p>
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
    </div>
  );
};

export default Chart;
