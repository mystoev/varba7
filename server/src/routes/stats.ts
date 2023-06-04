import { Stats } from "../db/models";

export const stats = async () => {
  const result = await Stats.find();
  console.log(result);
  return result;
};
