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
    latestSDS001: SDS001SensorData!
    latestBME280: BME280SensorData
    periodicSDS001(startDate: String!, endDate: String!): [SDS001SensorData]
    periodicBME280(startDate: String!, endDate: String!): [BME280SensorData]
  }
`;

export default typeDefs;
