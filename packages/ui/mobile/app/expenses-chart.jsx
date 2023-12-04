import {format, parseISO} from 'date-fns';
import React from 'react';
import {ScrollView, StyleSheet, View, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

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

const ExpensesChart = ({lastYearExpenses}) => {
  const data = lastYearExpenses.map(({month, amount}) => ({
    month: format(parseISO(month), 'MMM'),
    amount,
  }));
  data.reverse();
  return (
    <ScrollView>
      <View style={styles.container}>
        <BarChart
          chartDescription={{text: ''}}
          style={styles.chart}
          xAxis={{
            valueFormatter: data.map(d => d.month),
            granularity: 1,
          }}
          data={{
            dataSets: [
              {
                label: 'Last 12 months',
                values: data.map(d => d.amount),
                config: {
                  colors: [processColor('royalblue')],
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

export default ExpensesChart;
