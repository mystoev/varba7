const typeDefs = `#graphql
  "A number filter representing a timestamp"
  scalar Timestamp

  type SDS001SensorData {
    timestamp: Timestamp!
    pm10: Float!
    pm25: Float!
  }

  type BME280SensorData {
    timestamp: Timestamp!
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
