import {gql} from '@apollo/client';

export const GET_PERIODIC_BME280 = gql`
  query Query($startDate: String!, $endDate: String!) {
    periodicBME280(startDate: $startDate, endDate: $endDate) {
      temperature
      timestamp
    }
  }
`;

export const GET_MONTHS_WITH_DATA = gql`
  query Query {
    monthsWithData
  }
`;
