import gql from 'graphql-tag';

const HEART_RATES_QUERY = gql`
  query heartRates($filter: HeartRatesFilter!) {
    heartRates(filter: $filter) {
      mins {
        time
        value
      }
      maxs {
        time
        value
      }
      avgs {
        time
        value
      }
      fromTime
      endTime
    }
  }
`;

export default HEART_RATES_QUERY;
