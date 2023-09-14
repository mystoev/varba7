const resolvers = {
  Query: {
    latestSDS001: () => ({
      timestamp: "today",
      pm10: 3.5,
      pm25: 1.2,
    }),
    latestBME280: () => ({
      timestamp: "today",
      temperature: 30,
      humidity: 0.5,
    }),
  },
};

export default resolvers;
