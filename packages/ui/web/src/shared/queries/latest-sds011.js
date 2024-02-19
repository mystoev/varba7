import {gql} from '@apollo/client';

export const GET_LATEST_SDS011 = gql`
  query Query {
    latestSDS011 {
      timestamp
      pm25
      pm10
    }
  }
`;
