import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { connect } from "mongoose";

import { PeriodicBME280Data } from "./datasources/bme280-stats";
import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers/resolvers";
import typeDefs from "./schema";

dotenv.config({ path: __dirname + "/.env.local" });
const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;
connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.tl0wald.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApollo = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          weatherSensorsAPI: new WeatherSensorsAPI({ cache }),
          bme280Stats: new PeriodicBME280Data({ cache }),
        },
      };
    },
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startApollo();
