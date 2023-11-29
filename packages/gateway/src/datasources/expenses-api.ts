import { Expense } from "../models/mongo";

export class ExpensesAPI {
  async all() {
    return [
      {
        from: "",
        description: "",
        amount: 0,
        date: "",
        tags: "",
        to: "",
      },
    ];
  }

  async badge() {
    const expenses = await Expense.find({});

    const now = new Date();
    const thisYearEntries = expenses
      .filter((r) => r.date != null)
      .map((r) => ({
        Date: r.date,
        Amount: r.amount,
      }))
      .filter(
        (row: any) => row.Date.split(now.getFullYear().toString()).length == 2
      );

    const year = thisYearEntries
      .map((row: any) => (isNaN(+row.Amount) ? 0 : +row.Amount))
      .reduce((acc: number, current: number) => acc + current, 0);

    const thisMonth = now.getMonth() + 1;
    const thisMonthEntries = thisYearEntries.filter(
      (row: any) => +row.Date.split("-")[1] === thisMonth
    );

    const month = thisMonthEntries
      .map((row: any) => (isNaN(+row.Amount) ? 0 : +row.Amount))
      .reduce((acc: number, current: number) => acc + current, 0);

    return {
      month,
      year,
      lastEntry: thisMonthEntries[0].Date,
    };
  }
}
