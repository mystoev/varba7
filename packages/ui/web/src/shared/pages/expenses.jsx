import {useQuery} from '@apollo/client';
import {Text, View} from 'react-native';

import ExpensesChart from '../../expenses-chart';
import TopCategoriesChart from '../../top-categories-chart';
import {GET_LAST_12_MONTHS, LAST_YEAR_EXPENSES} from '../queries/expenses';
import {getByCategory} from '../selectors/expenses';
import {headingStyles} from '../styles/text';

export const ExpensesPage = () => {
  const {loading, data: lastYearExpenses} = useQuery(LAST_YEAR_EXPENSES);
  const {loading: topCategoriesLoading, data: topCategories} =
    useQuery(GET_LAST_12_MONTHS);

  const categoriesData = getByCategory(topCategories?.topCategories);

  return (
    <View style={{margin: 10}}>
      <Text style={headingStyles.h2Left}>Last 12 months' expenses</Text>
      <Text style={headingStyles.h3}>And their average</Text>
      {loading && <Text>Loading...</Text>}
      {lastYearExpenses && (
        <ExpensesChart lastYearExpenses={lastYearExpenses.lastYearExpenses} />
      )}
      <Text style={headingStyles.h2Left}>Expenses By Category</Text>
      <Text style={headingStyles.h3}>For the last 12 months</Text>
      {topCategoriesLoading && <Text>Loading...</Text>}
      {topCategories && <TopCategoriesChart data={categoriesData} />}
    </View>
  );
};
