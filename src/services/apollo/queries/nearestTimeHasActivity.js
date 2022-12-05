import gql from 'graphql-tag';

const NEAREST_TIME_HAS_ACTIVITY = gql`
  query nearestTimeHasActivity($utcOffset: Int) {
    nearestTimeHasActivity(utcOffset: $utcOffset) {
      isSuccess
      message
      time
    }
  }
`;

export default NEAREST_TIME_HAS_ACTIVITY;
