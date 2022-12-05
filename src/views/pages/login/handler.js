import { CognitoHostedUIIdentityProvider, Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import awsmobile from '../../../aws-exports';

Amplify.configure(awsmobile);

export const handleFacebookLogin = async () => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  } catch (e) {
    console.log('Facebook login error --->', e);
  }
};

export const handleGoogleLogin = async () => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  } catch (e) {
    console.log('Google login error --->', e);
  }
};

export const getUser = () => {
  Auth.currentAuthenticatedUser()
    .then(currentUser => console.log(currentUser))
    .catch(() => console.log('Not signed in'));
};
