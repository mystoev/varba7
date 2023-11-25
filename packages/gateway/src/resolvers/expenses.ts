import { ExpensesAPI } from "../datasources/expenses-api";

export const allExpenses = async (
  _parent: any,
  _args: any,
  {
    dataSources: { expensesAPI },
  }: { dataSources: { expensesAPI: ExpensesAPI } }
) => {
  return expensesAPI.all();
};
