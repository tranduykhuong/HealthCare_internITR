import gql from 'graphql-tag';

const ECG_BACKUPS_QUERY = gql`
  query ecgBackups($filter: EcgBackupFilter!) {
    ecgBackups(filter: $filter) {
      cookies
      cursor
      ecgBackups {
        _id
        backupTime
        channels
        dataUrl
        device
        gain
        metaUrl
        sampleSize
        samplingFrequency
        start
        stop
        url
      }
    }
  }
`;

export default ECG_BACKUPS_QUERY;
