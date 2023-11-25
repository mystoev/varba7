import csv from "csv-parse";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { createReadStream } from "fs";
import { finished } from "stream/promises";

const processFile = async () => {
  const parser = createReadStream("./finances.csv").pipe(
    csv.parse({
      delimiter: ",",
      columns: true,
    })
  );

  const records = <any>[];
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });

  await finished(parser);
  return records;
};

export class ExpensesAPI {
  async all() {
    const rows = await processFile();

    const result = rows
      .filter((row: any) => row.Date != "" && row.Amount != "")
      .map((row: any) => ({
        from: row.From,
        description: row.Description,
        amount: +row.Amount,
        date: parse(row.Date, "MMMM dd, yyyy", new Date()).toString(),
        tags: row.Tags.split(",").map((t: string) => t.trim()),
        to: row.To,
      }));

    return result;
  }

  async badge() {
    const rows = await processFile();

    const now = new Date();
    const thisYearEntries = rows.filter(
      (row: any) => row.Date.split(now.getFullYear().toString()).length == 2
    );

    const year = thisYearEntries
      .map((row: any) => (isNaN(+row.Amount) ? 0 : +row.Amount))
      .reduce((acc: number, current: number) => acc + current, 0);

    const thisMonth = format(now, "LLLL", { locale: enUS });
    const thisMonthEntries = thisYearEntries.filter(
      (row: any) => row.Date.split(" ")[0] === thisMonth
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
