import { Client } from "@notionhq/client";
import * as dotnev from "dotenv";
import "dotenv/config";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const path = join(__filename, "../../");
dotnev.config({ path: join(path, ".env") });

const { NOTION_TOKEN, NOTION_EXPENSES_ID } = process.env;

const notion = new Client({ auth: NOTION_TOKEN });
const databaseId = NOTION_EXPENSES_ID;

const processExpenses = async (pages, lastSyncId) => {
  console.log("Processing next batch of Notion pages...");

  const expenses = [];
  for await (const page of pages) {
    const pageId = page.id;
    console.log(`Getting page id: ${pageId}`);

    const descriptionPromise = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: page.properties["Description"].id,
    });

    const amountPromise = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: page.properties["Amount"].id,
    });

    const datePromise = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: page.properties["Date"].id,
    });

    const tagsPromise = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: page.properties["Tags"].id,
    });

    const toPromise = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: page.properties["To"].id,
    });

    const [description, amount, date, tags, to] = await Promise.all([
      descriptionPromise,
      amountPromise,
      datePromise,
      tagsPromise,
      toPromise,
    ]);

    expenses.push({
      description: description.results?.[0]?.title?.plain_text,
      amount: amount?.number,
      date: date.date?.start,
      tags: tags.multi_select?.map((o) => o.name).join(","),
      to: to.select?.name,
    });
  }

  return expenses;
};

export const getLatestExpenses = async (lastSyncId) => {
  const expenses = [];
  let newSyncId = null;
  let cursor = undefined;
  const shouldContinue = true;

  while (shouldContinue) {
    console.log("Getting next batch of Notion pages...");
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });

    if (newSyncId == null) {
      newSyncId = results[0].id;
    }

    let fullySynced = false;
    const resultsToProcess = [];
    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      if (result.id === lastSyncId) {
        fullySynced = true;
        break;
      }

      resultsToProcess.push(result);
    }

    const result = await processExpenses(resultsToProcess, lastSyncId);
    expenses.push(...result);

    if (!next_cursor || fullySynced) {
      break;
    }
    cursor = next_cursor;
  }

  return { expenses, newSyncId };
};
