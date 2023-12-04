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

  type ExpenseEntry {
    description: String
    amount: Float
    date: String
    tags: [String]
    from: String
    to: String
  }

  type BadgeExpense {
    month: Float
    year: Float
    lastEntry: String
  }

  type LastYearExpense {
    month: String,
    amount: Float
  }

  type Query {
    latestSDS011: SDS011SensorData!
    latestBME280: BME280SensorData
    periodicBME280(startDate: String!, endDate: String!): [BME280SensorData]
    monthsWithData: [String]!
    expenses: [ExpenseEntry]!
    badgeExpenses: BadgeExpense!
    lastYearExpenses: [LastYearExpense]
  }
`;

export default typeDefs;
