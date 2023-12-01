import {useQuery} from '@apollo/client';
import {add, format} from 'date-fns';
import {useState} from 'react';

import {View} from 'react-native';
import Chart from '../../chart';
import {MonthDropdown} from '../../month-dropdown';
import {GET_PERIODIC_BME280} from '../queries/periodic-bme280';
import {maxTemperatures} from '../selectors/temperature';

const start = new Date();
const START_MONTH = format(start, 'yyyy-MM') + '-1';

const end = start.setMonth(start.getMonth() + 1);
const END_MONTH = format(end, 'yyyy-MM') + '-1';

export const BME280Page = () => {
  const [startDate, setStartDate] = useState(START_MONTH);
  const [endDate, setEndDate] = useState(END_MONTH);

  const {data} = useQuery(GET_PERIODIC_BME280, {
    variables: {startDate, endDate},
  });

  return (
    data && (
      <View>
        <MonthDropdown
          selectedMonth={startDate}
          onSelectItem={month => {
            const nextMonth = add(month, {months: 1});

            const sD = format(month, 'yyyy-MM') + '-1';
            setStartDate(sD);
            const eD = format(nextMonth, 'yyyy-MM') + '-1';
            setEndDate(eD);
          }}
        />
        <Chart
          data={maxTemperatures(data.periodicBME280, startDate, endDate)}
        />
      </View>
    )
  );
};
