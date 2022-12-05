import gql from 'graphql-tag';

const SNAPSHOTS_QUERY = gql`
  query snapshots($sortBy: String, $filter: SnapshotFilter!, $limit: Int, $limitStrip: Boolean, $cursor: String) {
    snapshots(sortBy: $sortBy, filter: $filter, limit: $limit, limitStrip: $limitStrip, cursor: $cursor) {
      cookies 
      cursor
      querySignature
      snapshots {
        _id
        channels
        contentUrl
        createdTime
        duration
        gain
        hrv
        maxHeartRate
        minHeartRate
        note
        preEventTime
        purpose
        sampleSize
        source
        start
        star
        tags
        thumbnail
        updatedAt
        url
      }
    }
  }
`;

export default SNAPSHOTS_QUERY;
