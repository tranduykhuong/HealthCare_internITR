import gql from 'graphql-tag';

const HEART_RATES_AVERAGE_QUERY = gql`
  query heartRateAverage($start: Float!, $stop: Float!, $utcOffset: Int) {
    heartRateAverage(start: $start, stop: $stop, utcOffset: $utcOffset) {
      hrv
      resting
      standing
      activity
      activeMinutes {
        duration
        time
      }
      ceiledActiveMinutes {
        duration
        time
      }
    }
  }
`;

export default HEART_RATES_AVERAGE_QUERY;
