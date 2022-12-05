import createClient from '../apolloClient';
import UPDATE_SNAPSHOT_MUTATION from '../motations/updateSnapshot';

const handleUpdateSnapshot = async (input) => {
  const client = await createClient();

  const result = await client.mutate({
    mutation: UPDATE_SNAPSHOT_MUTATION,
    variables: {
      id: input.id,
      input: {
        note: input.note,
        tags: input.tags,
      },
    },
  });

  const { data } = result;
  const { updateSnapshot } = data;

  if (!updateSnapshot.isSuccess) {
    throw new Error('Error to update snapshot!');
  }

  return updateSnapshot;
};

export default handleUpdateSnapshot;
