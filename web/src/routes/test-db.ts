import { TestDb } from "../db/models";

export const testDb = async () => {
  const result = await TestDb.findOne();
  console.log(result);
  return result;
};
