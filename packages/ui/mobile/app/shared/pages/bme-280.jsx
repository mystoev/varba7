import {useQuery} from '@apollo/client';
import {format} from 'date-fns';

import Chart from '../../chart';
import {GET_PERIODIC_BME280} from '../queries/periodic-bme280';
import {maxTemperatures} from '../selectors/temperature';

const now = new Date();
const nextMonth = +format(now, 'MM') + 1;
const START_MONTH = format(now, 'yyyy-MM') + '-1';
const END_MONTH = format(now, `yyyy-${nextMonth}`) + '-1';

export const BME280Page = () => {
  const {data} = useQuery(GET_PERIODIC_BME280, {
    variables: {startDate: START_MONTH, endDate: END_MONTH},
  });

  return (
    data && (
      <Chart
        data={maxTemperatures(data.periodicBME280, START_MONTH, END_MONTH)}
      />
    )
  );
};
