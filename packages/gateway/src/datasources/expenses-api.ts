import csv from "csv-parse";
import { parse } from "date-fns";
import { createReadStream } from "fs";
import { finished } from "stream/promises";

export class ExpensesAPI {
  async all() {
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
}
