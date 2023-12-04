import {useQuery} from '@apollo/client';
import {Text, View} from 'react-native';

import {GET_LAST_12_MONTHS} from '../queries/expenses';

export const ExpensesPage = () => {
  const {loading, error, data} = useQuery(GET_LAST_12_MONTHS);
  console.log(data?.lastYearExpenses);

  return (
    <View>
      <Text>Expenses Page</Text>
    </View>
  );
};
