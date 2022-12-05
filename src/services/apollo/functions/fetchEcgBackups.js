import createClient from '../apolloClient';
import ECG_BACKUPS_QUERY from '../queries/ecgBackups';

const fetchEcgBackups = async (filter) => {
  const client = await createClient();

  const result = await client.query({
    query: ECG_BACKUPS_QUERY,
    variables: {
      filter,
    },
  });

  if (!result) {
    throw new Error('Failed to fetch data in ecgBackups: no result');
  }
  const { data } = result;
  if (!data) {
    throw new Error('Failed to fetch data in ecgBackups: no data');
  }
  const { ecgBackups } = data;

  if (!ecgBackups) {
    throw new Error('Failed to fetch data in ecgBackups!');
  }

  return ecgBackups;
};

export default fetchEcgBackups;
