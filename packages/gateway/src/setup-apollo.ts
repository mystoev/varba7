import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";

import { GraphQLError } from "graphql";
import { PeriodicBME280Data } from "./datasources/bme280-stats";
import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers";
import typeDefs from "./schema";

dotenv.config({ path: __dirname + "/../.env.local" });
const { MOBILE_TOKEN, TOKEN, APP_PORT } = process.env;

const isProd = process.env.NODE_ENV === "production";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: !isProd,
});

export const start = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const userToken = token.split(" ")[1];

      if (isProd) {
        if ([TOKEN, MOBILE_TOKEN].indexOf(userToken) === -1) {
          throw new GraphQLError("You must be logged in!", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        }
      }

      const { cache } = server;

      return {
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
