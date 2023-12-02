import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { GET_PERIODIC_BME280 } from "./shared/queries/periodic-bme280";
import { maxTemperatures } from "./shared/selectors/temperature";

const Chart = ({ startDate, endDate }) => {
  const { data } = useQuery(GET_PERIODIC_BME280, {
    variables: { startDate, endDate },
  });

  if (!data) {
    return null;
  }

  const maxTemps = maxTemperatures(data.periodicBME280, startDate, endDate);

  return (
    <View>
      <BarChart
        data={maxTemps}
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
