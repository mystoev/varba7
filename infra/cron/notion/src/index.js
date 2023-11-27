import { setupMongo } from "./mongo.js";
import { setupNotion } from "./notion.js";

(async () => {
  await setupNotion();
  await setupMongo();
})();
