import createClient from '../apolloClient';
import UPDATE_PROFILE_MUTATION from '../motations/updateProfile';

const handleUpdateProfile = async (input) => {
  const client = await createClient();

  const result = await client.mutate({
    mutation: UPDATE_PROFILE_MUTATION,
    variables: {
      input: {
        firstName: input.firstName,
        lastName: input.lastName,
        dateOfBirth: input.dob,
        gender: input.gender,
        height: parseFloat(input.height),
        weight: parseFloat(input.weight),
        avatar: input.avatar,
        // email: input.email,
        // address: { address: input.address },
      },
    },
  });

  const { data } = result;
  const { updateProfile } = data;

  if (!updateProfile.isSuccess) {
    throw new Error('Error to update profile!');
  }

  const { profile } = updateProfile;
  return profile;
};

export default handleUpdateProfile;
