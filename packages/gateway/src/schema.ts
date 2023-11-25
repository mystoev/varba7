const typeDefs = `#graphql
  "A number filter representing a timestamp"
  scalar Timestamp

  type SDS011SensorData {
    timestamp: Timestamp!
    pm25: Float!
    pm10: Float!
  }

  type BME280SensorData {
    timestamp: Timestamp!
    temperature: Float!
    humidity: Float!
  }

  type FinanceEntry {
    description: String
    amount: Float
    date: String
    tags: [String]
    from: String
    to: String
  }

  type Query {
    latestSDS011: SDS011SensorData!
    latestBME280: BME280SensorData
    periodicBME280(startDate: String!, endDate: String!): [BME280SensorData]
    monthsWithData: [String]!
    finances: [FinanceEntry]!
  }
`;

export default typeDefs;
