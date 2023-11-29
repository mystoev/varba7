import { Schema, model } from "mongoose";

const expenseSchema = Schema({
  description: String,
  amount: Number,
  date: String,
  tags: String,
  to: String,
});

export const Expense = model("expense", expenseSchema, "entry");

const syncSchema = Schema({
  id: String,
  lastSyncId: String,
});

export const Sync = model("sync", syncSchema, "sync");
