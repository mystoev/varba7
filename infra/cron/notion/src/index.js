import {
  closeMongo,
  getLastSyncId,
  setupMongo,
  storeExpenses,
  storeNewSyncId,
} from "./mongo.js";
import { getLatestExpenses } from "./notion.js";

(async () => {
  await setupMongo();
  const id = await getLastSyncId();
  const { expenses, newSyncId } = await getLatestExpenses(id);

  await storeExpenses(expenses);
  await storeNewSyncId(newSyncId);

  closeMongo();
})();
