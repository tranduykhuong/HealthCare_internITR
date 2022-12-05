import createClient from '../apolloClient';
import REQUEST_FILE_UPLOAD_QUERY from '../queries/requestFileUpload';

const fetchRequestFileUpload = async (input) => {
  const client = await createClient();

  const result = await client.query({
    query: REQUEST_FILE_UPLOAD_QUERY,
    variables: {
      input,
    },
  });

  const { data } = result;

  if (!data) {
    throw new Error('Error to fetch file upload: no data');
  }

  const { requestFileUpload } = data;
  const { urls, isSuccess, message } = requestFileUpload;

  if (!isSuccess) {
    throw new Error(message);
  }
  return urls;
};

export default fetchRequestFileUpload;
