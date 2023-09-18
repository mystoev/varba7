import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { PeriodicBME280Data } from "./datasources/bme280-stats";
import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const start = async () => {
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
