import { Client } from "@notionhq/client";
import "dotenv/config";

const { NOTION_TOKEN, NOTION_EXPENSES_ID } = process.env;

const notion = new Client({ auth: NOTION_TOKEN });
const databaseId = NOTION_EXPENSES_ID;

export const setupNotion = async () => {
  const pages = [];
  let cursor = undefined;

  // const shouldContinue = true;
  // while (shouldContinue) {
  const { results, next_cursor } = await notion.databases.query({
    database_id: databaseId,
    start_cursor: cursor,
  });
  pages.push(...results);
  // if (!next_cursor) {
  //   break;
  // }
  cursor = next_cursor;
  // }

  const page = pages[0];
  const pageId = page.id;

  console.log(pageId);

  const description = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: page.properties["Description"].id,
  });

  console.log(description.results[0].title.plain_text);

  const amount = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: page.properties["Amount"].id,
  });

  console.log(amount.number);

  const date = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: page.properties["Date"].id,
  });

  console.log(date.date.start);

  const tags = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: page.properties["Tags"].id,
  });

  console.log(tags.multi_select.map((o) => o.name).join(","));

  const to = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: page.properties["To"].id,
  });

  console.log(to.select.name);
};
