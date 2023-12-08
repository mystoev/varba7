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
    const expenses = await Expense.find({}, {}, { sort: { date: -1 } });

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
      lastEntry: thisMonthEntries?.[0]?.Date ?? 0,
    };
  }

  async lastYear() {
    const expenses = await Expense.find({}, {}, { sort: { date: -1 } });

    const entries = expenses
      .filter((r) => r.date != null)
      .map((r) => ({
        Date: r.date,
        Amount: r.amount,
      }));

    const result = [];
    for (let index = 0; index < 12; index++) {
      const now = new Date();
      now.setMonth(now.getMonth() - index);

      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const currentMonthEntries = entries.filter((row: any) => {
        const [year, month] = row.Date.split("-");
        return +month === currentMonth && +year === currentYear;
      });

      const amount = currentMonthEntries
        .map((row: any) => (isNaN(+row.Amount) ? 0 : +row.Amount))
        .reduce((acc: number, current: number) => acc + current, 0);

      result.push({ month: now.toISOString(), amount });
    }

    return result;
  }

  async topCategories() {
    const expenses = await Expense.find({}, {}, { sort: { date: -1 } });

    const entries = expenses
      .filter((r) => r.date != null)
      .map((r) => ({
        date: r.date,
        amount: r.amount,
        tags: r.tags.split(","),
      }));

    const result = [];
    for (let index = 1; index <= 12; index++) {
      const now = new Date();
      now.setMonth(now.getMonth() - index);

      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const currentMonthEntries = entries.filter((row: any) => {
        const [year, month] = row.date.split("-");
        return +month === currentMonth && +year === currentYear;
      });

      result.push(...currentMonthEntries);
    }

    return result;
  }
}
