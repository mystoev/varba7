import { Schema, model } from "mongoose";

interface IBME280 {
  timestamp: number;
  temperature: number;
  humidity: number;
}

export const BME280 = model<IBME280>(
  "Stats",
  new Schema<IBME280>({
    timestamp: { type: Number },
    temperature: { type: Number },
    humidity: { type: Number },
  }),
  "weather"
);

interface IExpense {
  description: String;
  amount: number;
  date: String;
  tags: String;
  to: String;
}

export const Expense = model<IExpense>(
  "expense",
  new Schema<IExpense>({
    description: { type: String },
    amount: { type: Number },
    date: { type: String },
    tags: { type: String },
    to: { type: String },
  }),
  "expenses"
);
