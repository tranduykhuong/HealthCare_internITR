import createClient from '../apolloClient';
import HEART_RATES_AVERAGE_QUERY from '../queries/heartRateAverage';

const fetchHeartRateAverage = async (filter) => {
  const client = await createClient(true);

  const data = await client.query({
    query: HEART_RATES_AVERAGE_QUERY,
    variables: {
      start: filter.start,
      stop: filter.stop,
      utcOffset: filter.utcOffset,
    },
  });

  if (!data) {
    throw new Error('Error fetch data in HRA: no data');
  }
  const result = data?.data;
  if (!result) {
    throw new Error('Error fetch data in HRA: no result');
  }

  const { heartRateAverage } = result;
  return heartRateAverage;
};

export default fetchHeartRateAverage;
