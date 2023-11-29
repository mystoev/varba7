import { Schema, model } from "mongoose";

const expenseSchema = Schema({
  description: String,
  amount: Number,
  date: String,
  tags: String,
  to: String,
});

export const Expense = model("expense", expenseSchema, "expenses");

const syncSchema = Schema({
  id: String,
  lastSyncId: String,
});

export const Sync = model("sync", syncSchema, "expenses-sync");
