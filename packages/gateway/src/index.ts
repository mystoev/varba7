import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { WeatherSensorsAPI } from "./datasources/weather-sensors-api";
import resolvers from "./resolvers";
import typeDefs from "./schema";

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
        },
      };
    },
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startApollo();
