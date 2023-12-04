import {useQuery} from '@apollo/client';
import {View} from 'react-native';

import ExpensesChart from '../../expenses-chart';
import {GET_LAST_12_MONTHS} from '../queries/expenses';

export const ExpensesPage = () => {
  const {loading, error, data} = useQuery(GET_LAST_12_MONTHS);

  return (
    <View>
      {data && <ExpensesChart lastYearExpenses={data.lastYearExpenses} />}
    </View>
  );
};
