import { useQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";

import ExpensesChart from "../../expenses-chart";
import TopCategoriesChart from "../../top-categories-chart";
import { GET_LAST_12_MONTHS, LAST_YEAR_EXPENSES } from "../queries/expenses";
import { getByCategory } from "../selectors/expenses";

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  h1: {
    fontSize: 24,
    marginTop: 10,
  },
  h2: {
    fontSize: 12,
  },
});

export const ExpensesPage = () => {
  const { loading, data: lastYearExpenses } = useQuery(LAST_YEAR_EXPENSES);
  const { loading: topCategoriesLoading, data: topCategories } =
    useQuery(GET_LAST_12_MONTHS);

  const categoriesData = getByCategory(topCategories?.topCategories);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Last 12 months' expenses</Text>
      <Text style={styles.h2}>And their average</Text>
      {loading && <Text>Loading...</Text>}
      {lastYearExpenses && (
        <ExpensesChart lastYearExpenses={lastYearExpenses.lastYearExpenses} />
      )}
      <Text style={styles.h1}>Expenses By Category</Text>
      <Text style={styles.h2}>For the last 12 months</Text>
      {topCategoriesLoading && <Text>Loading...</Text>}
      {topCategories && <TopCategoriesChart data={categoriesData} />}
    </View>
  );
};
