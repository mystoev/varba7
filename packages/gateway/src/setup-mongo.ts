import * as dotenv from "dotenv";
import { connect as connectToDb } from "mongoose";

dotenv.config({ path: __dirname + "/.env.local" });
const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;

export const connect = async () =>
  connectToDb(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.tl0wald.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
  );
