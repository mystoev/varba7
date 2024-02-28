import { useQuery } from "@apollo/client";

import ExpensesChart from "../expenses-chart";
import { GET_LAST_12_MONTHS, LAST_YEAR_EXPENSES } from "../queries/expenses";
import { getByCategory } from "../selectors/expenses";
import TopCategoriesChart from "../top-categories-chart";

export const ExpensesPage = () => {
  const { loading, data: lastYearExpenses } = useQuery(LAST_YEAR_EXPENSES);
  const { loading: topCategoriesLoading, data: topCategories } =
    useQuery(GET_LAST_12_MONTHS);

  const categoriesData = getByCategory(topCategories?.topCategories);

  return (
    <div style={{ margin: 10 }}>
      <p
        style={{
          fontSize: 32,
          color: "black",
          paddingTop: 10,
        }}
      >
        Last 12 months' expenses
      </p>
      <p span style={{ fontSize: 12 }}>
        And their average
      </p>
      {loading && <p>Loading...</p>}
      {lastYearExpenses && (
        <ExpensesChart lastYearExpenses={lastYearExpenses.lastYearExpenses} />
      )}
      <p
        style={{
          fontSize: 32,
          color: "black",
          paddingTop: 10,
        }}
      >
        Expenses By Category
      </p>
      <p style={{ fontSize: 12 }}>For the last 12 months</p>
      {topCategoriesLoading && <p>Loading...</p>}
      {topCategories && <TopCategoriesChart data={categoriesData} />}
    </div>
  );
};
