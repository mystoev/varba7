import { connect } from "mongoose";

export const setupMongo = async (
  databaseName: string,
  user: string,
  pass: string
) => {
  await connect(
    `mongodb+srv://${user}:${pass}@cluster0.tl0wald.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  );
};
