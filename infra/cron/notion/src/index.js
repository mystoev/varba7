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

  if (expenses.length > 0) {
    await storeExpenses(expenses);
    await storeNewSyncId(newSyncId);
  } else {
    console.log("Nothing new to sync!");
  }

  closeMongo();
})();
