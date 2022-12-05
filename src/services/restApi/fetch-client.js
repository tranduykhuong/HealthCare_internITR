async function fetchRequest(myRequest) {
  const response = await fetch(myRequest);
  const body = await response.json();
  return body;
}

function fetchClient({ url, method, body }) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    body: JSON.stringify(body),
    headers: defaultHeaders,
  };

  const request = new Request(url, options);
  return fetchRequest(request);
}

export default fetchClient;
