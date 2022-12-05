import createClient from '../apolloClient';
import ME_QUERY from '../queries/me';

const fetchMe = async () => {
  const client = await createClient();

  const result = await client.query({
    query: ME_QUERY,
  });

  if (!result) {
    throw new Error('Error to fetch me: no result!');
  }
  const { data } = result;
  if (!result) {
    throw new Error('Error to fetch me: no data!');
  }
  const { me } = data;
  if (!me) {
    throw new Error('Error to fetch me: no me!');
  }
  return me;
};

export default fetchMe;
