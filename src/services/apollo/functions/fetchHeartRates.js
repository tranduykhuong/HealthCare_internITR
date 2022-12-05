import createClient from '../apolloClient';
import HEART_RATES_QUERY from '../queries/heartRates';

const fetchHeartRates = async (filter) => {
  const client = await createClient(true);

  const data = await client.query({
    query: HEART_RATES_QUERY,
    variables: {
      filter,
    },
  });

  if (!data) {
    throw new Error('Error fetch HeartRate: no data');
  }
  const result = data?.data;
  if (!result) {
    throw new Error('Error fetch HeartRate: no result');
  }

  const { heartRates } = result;
  return heartRates;
};

export default fetchHeartRates;
