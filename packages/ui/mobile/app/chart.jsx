import {format} from 'date-fns';
import React from 'react';
import {ScrollView, StyleSheet, View, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    margin: 10,
  },
  chart: {
    flex: 1,
  },
});

const Chart = ({data}) => {
  const dates = data.map(d => format(d.timestamp, 'd'));
  const temperatures = data.map(d => d.temperature);

  return (
    <ScrollView>
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          xAxis={{
            valueFormatter: dates,
            granularity: 1,
          }}
          data={{
            dataSets: [
              {
                label: 'Temperature',
                values: temperatures,
                config: {
                  colors: [processColor('orangered')],
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
