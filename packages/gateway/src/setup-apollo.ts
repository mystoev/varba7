import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import jwt_decode from "jwt-decode";

import { PeriodicBME280Data } from "./datasources/bme280-stats";
import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers";
import typeDefs from "./schema";

dotenv.config({ path: __dirname + "/.env.local" });
const { TOKEN } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const start = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const userId = token.split(" ")[1];

      let userInfo = {};
      if (userId === TOKEN) {
        userInfo = jwt_decode(userId);
      }

      const { cache } = server;

      return {
        userInfo: { ...userInfo },
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
