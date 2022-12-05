import gql from 'graphql-tag';

const ME_QUERY = gql`
  query me {
    me {
      _id
      firstName
      lastName
      gender
      weight
      height
      dateOfBirth
      address {
        address
      }
      contact {
        address
        city
        country
        state
        zip
      }
      avatar
      email
      isProfileCompleted
      utcOffset
    }
  }
`;

export default ME_QUERY;
