import { Schema, model } from "mongoose";
import { ITestDb } from "../../domain/test-db";

export const TestDbSchema = new Schema<ITestDb>({
  name: { type: String },
  age: { type: Number },
});

export const TestDb = model<ITestDb>("TestDb", TestDbSchema, "logs");
