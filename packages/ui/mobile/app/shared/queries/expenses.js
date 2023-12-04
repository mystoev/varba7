import {gql} from '@apollo/client';

export const GET_ALL_EXPENSES = gql`
  query Query {
    expenses {
      description
      amount
      date
      tags
      from
      to
    }
  }
`;

export const GET_BADGE_EXPENSES = gql`
  query Query {
    badgeExpenses {
      month
      year
      lastEntry
    }
  }
`;

export const GET_LAST_12_MONTHS = gql`
  query Query {
    lastYearExpenses {
      month
      amount
    }
  }
`;
