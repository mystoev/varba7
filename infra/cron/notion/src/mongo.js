import * as dotnev from "dotenv";
import mongoose from "mongoose";
import { join } from "path";
import { fileURLToPath } from "url";
import { Expense, Sync } from "./models.js";

const __filename = fileURLToPath(import.meta.url);
const path = join(__filename, "../../");
dotnev.config({ path: join(path, ".env") });

export const setupMongo = async () => {
  const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;

  console.log("Setting up mongo connection...");
  await mongoose.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.tl0wald.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
  );
};

export const getLastSyncId = async () => {
  console.log("Getting last sync ID...");
  const hasSync = await Sync.findOne({});

  if (hasSync == null) {
    console.log("No last sync id. Syncing for the first time...");
    return null;
  }
  console.log(`Last sync id: ${hasSync.lastSyncId}`);
  return hasSync.lastSyncId;
};

export const storeNewSyncId = async (id) => {
  await Sync.updateOne(
    { id: "1" },
    { id: "1", lastSyncId: id },
    { upsert: true }
  );
  console.log(`Last sync id stored: ${id}`);
};

export const storeExpenses = async (expenses) => {
  console.log(`Storing ${expenses.length} new expenses...`);

  const promises = expenses.map((expense) => {
    const test = new Expense(expense);
    return test.save();
  });

  await Promise.all(promises);
  console.log("All expenses saved to db!");
};

export const closeMongo = () => {
  console.log("Closing mongo connection...");
  mongoose.connection.close();
};
