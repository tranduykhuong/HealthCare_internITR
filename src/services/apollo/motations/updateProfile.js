import gql from 'graphql-tag';

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      isSuccess
      message
      profile {
        _id
        isProfileCompleted
        firstName
        lastName
        dateOfBirth
        gender
        weight
        height
        avatar
      }
    }
  }
`;

export default UPDATE_PROFILE_MUTATION;
