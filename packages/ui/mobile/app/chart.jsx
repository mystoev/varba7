import {useQuery} from '@apollo/client';
import {format} from 'date-fns';
import React from 'react';
import {ScrollView, StyleSheet, View, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {GET_PERIODIC_BME280} from './shared/queries/periodic-bme280';
import {
  averageTemperatures,
  maxTemperatures,
} from './shared/selectors/temperature';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  chart: {
    flex: 1,
    height: 250,
  },
});

const Chart = ({startDate, endDate}) => {
  const {data} = useQuery(GET_PERIODIC_BME280, {
    variables: {startDate, endDate},
  });

  if (!data) {
    return null;
  }

  const maxTemps = maxTemperatures(data.periodicBME280, startDate, endDate);
  const avgTemps = averageTemperatures(data.periodicBME280, startDate, endDate);

  return (
    <ScrollView>
      <View style={styles.container}>
        <BarChart
          chartDescription={{text: ''}}
          style={styles.chart}
          xAxis={{
            valueFormatter: maxTemps.map(d => format(d.timestamp, 'd')),
            granularity: 1,
          }}
          data={{
            dataSets: [
              {
                label: 'Max Temperatures',
                values: maxTemps.map(d => d.temperature),
                config: {
                  colors: [processColor('orangered')],
                  valueTextSize: 10,
                },
              },
            ],
          }}
        />
        <BarChart
          chartDescription={{text: ''}}
          style={styles.chart}
          xAxis={{
            valueFormatter: avgTemps.map(d => format(d.timestamp, 'd')),
            granularity: 1,
          }}
          data={{
            dataSets: [
              {
                label: 'Average Temperatures',
                values: avgTemps.map(d => d.temperature),
                config: {
                  colors: [processColor('green')],
                  valueTextSize: 10,
                },
              },
            ],
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Chart;
