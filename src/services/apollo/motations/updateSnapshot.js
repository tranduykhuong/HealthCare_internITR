import gql from 'graphql-tag';

const UPDATE_SNAPSHOT_MUTATION = gql`
  mutation updateSnapshot($id: ID!, $input: UpdateSnapshotInput!) {
    updateSnapshot(id: $id, input: $input) {
      isSuccess
      message
    }
  }
`;

export default UPDATE_SNAPSHOT_MUTATION;
