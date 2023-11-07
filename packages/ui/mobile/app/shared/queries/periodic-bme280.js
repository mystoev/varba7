import { gql } from "@apollo/client";

export const GET_PERIODIC_BME280 = gql`
  query Query($startDate: String!, $endDate: String!) {
    periodicBME280(startDate: $startDate, endDate: $endDate) {
      temperature
      timestamp
    }
  }
`;
