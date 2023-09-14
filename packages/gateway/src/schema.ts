const typeDefs = `#graphql
  type SDS001SensorData {
    timestamp: String!
    pm10: Float!
    pm25: Float!
  }

  type BME280SensorData {
    timestamp: String!
    temperature: Float!
    humidity: Float!
  }

  type Query {
    latestFineDustParticlesInfo: [SDS001SensorData]!
    latestClimateInfo: [BME280SensorData]
  }
`;

export default typeDefs;
