import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import jwt_decode from "jwt-decode";

import { PeriodicBME280Data } from "./datasources/bme280-stats";
import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers";
import typeDefs from "./schema";

dotenv.config({ path: __dirname + ".env.local" });
const { TOKEN, APP_PORT } = process.env;

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
    listen: { port: !APP_PORT || isNaN(+APP_PORT) ? 4000 : +APP_PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
