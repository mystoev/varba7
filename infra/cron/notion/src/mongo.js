import "dotenv/config";
import mongoose from "mongoose";

export const setupMongo = async () => {
  const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;

  const expenseSchema = mongoose.Schema({
    description: String,
    amount: Number,
    date: String,
    tags: String,
    to: String,
  });

  const Expense = mongoose.model("expense", expenseSchema, "family");

  await mongoose.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.tl0wald.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
  );

  const test = new Expense({ description: "asdf" });
  await test.save();

  mongoose.connection.close();
};
