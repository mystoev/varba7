import {gql} from '@apollo/client';

export const GET_LATEST_BME280 = gql`
  query Query {
    latestBME280 {
      humidity
      temperature
      timestamp
    }
  }
`;
