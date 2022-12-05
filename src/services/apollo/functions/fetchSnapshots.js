import createClient from '../apolloClient';
import SNAPSHOTS_QUERY from '../queries/snapshots';

const fetchSnapshots = async (input) => {
  const client = await createClient();

  const result = await client.query({
    query: SNAPSHOTS_QUERY,
    variables: {
      sortBy: input?.sortBy,
      filter: {
        status: input?.filter?.status,
        tags: input?.filter?.tags,
        star: input?.filter?.star,
        start: input?.filter?.start,
        ids: input?.filter?.ids,
        duration: input?.filter?.duration,
      },
      limit: input?.limit,
      limitStrip: input?.limitStrip,
      cursor: input?.cursor,
    },
  });

  if (!result) {
    throw new Error('Failed to fetch data in snapshots: no result');
  }
  const { data } = result;
  if (!data) {
    throw new Error('Failed to fetch data in snapshots: no data');
  }
  const { snapshots } = data;

  if (!snapshots) {
    throw new Error('Failed to fetch data in snapshots!');
  }

  return snapshots;
};

export default fetchSnapshots;
