import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

const Chart = ({data}) => {
  const dates = data.map(d => format(d.timestamp, 'd'));
  const temperatures = data.map(d => d.temperature);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          xAxis={{
            valueFormatter: dates,
          }}
          data={{
            dataSets: [{label: 'Temperature', values: temperatures}],
          }}
        />
      </View>
    </View>
  );
};

export default Chart;
