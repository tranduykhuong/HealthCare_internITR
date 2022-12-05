import createClient from '../apolloClient';
import NEAREST_TIME_HAS_ACTIVITY from '../queries/nearestTimeHasActivity';

const fetchNearestTimeHasActivity = async (filter) => {
  const client = await createClient();

  try {
    const result = await client.query({
      query: NEAREST_TIME_HAS_ACTIVITY,
      variables: {
        utcOffset: filter.utcOffset,
      },
    });

    const { data } = result;
    const { nearestTimeHasActivity } = data;

    return nearestTimeHasActivity;
  } catch (err) {
    throw err;
  }
};

export default fetchNearestTimeHasActivity;
