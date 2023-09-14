import "dotenv/config";
import { setupMongo } from "./src/db/setup-mongo";
import { setupFastify } from "./src/setup-fastify";

const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS, APP_PORT, IP } = process.env;

setupMongo(
  MONGODB_NAME as string,
  MONGODB_USER as string,
  MONGODB_PASS as string
);

setupFastify(IP as string, APP_PORT as string);
