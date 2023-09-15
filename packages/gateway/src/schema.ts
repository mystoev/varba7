const typeDefs = `#graphql
  "A number filter representing a timestamp"
  scalar Timestamp

  type SDS011SensorData {
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
    latestSDS011: SDS011SensorData!
    latestBME280: BME280SensorData
    periodicSDS011(startDate: String!, endDate: String!): [SDS011SensorData]
    periodicBME280(startDate: String!, endDate: String!): [BME280SensorData]
  }
`;

export default typeDefs;
