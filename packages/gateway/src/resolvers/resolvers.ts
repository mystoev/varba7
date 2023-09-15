import { Timestamp } from "./timestamp-scalar";

const resolvers = {
  Timestamp,
  Query: {
    latestSDS001: () => ({
      timestamp: new Date(),
      pm10: 3.5,
      pm25: 1.2,
    }),
    latestBME280: () => ({
      timestamp: 1694765164,
      temperature: 30,
      humidity: 0.5,
    }),
  },
};

export default resolvers;
