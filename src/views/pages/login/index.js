import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Auth } from '@aws-amplify/auth';
import { Amplify, Hub } from '@aws-amplify/core';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import awsmobile from '../../../aws-exports';
import awsmobile from '../../../awsmobile';
import {
  iconApple,
  iconFacebook,
  iconGoogle,
  logo,
} from '../../../assets/images/svg';
import ButtonCT from '../../components/buttonCT';
import EmailForm from './emailform';
import Introduce from './introduce';
import './styles.scss';
import { handleFacebookLogin, handleGoogleLogin, getUser } from './handler';
import auth from '../../../utils/auth';
import { loginRequest } from '../../../redux/actions/login';
import useMergeState from '../../../utils/hooks/useMergeState';
import { ToastError } from '../../components/toastStr';

Amplify.configure(awsmobile);

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateLogin = useSelector(state => state.login);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useMergeState({
    signIn: false,
    google: false,
    facebook: false,
    apple: false,
  });
  const [errorSignIn, setError] = useMergeState({
    email: '',
    password: '',
  });

  const signIn = async (username, password) => {
    setLoading({ signIn: true });
    await Auth.signIn(username, password)
      .then(() => {
        console.log('Sign in success!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const listen = ({ payload: { event, data } }) => {
      console.log(data);
      switch (event) {
        case 'signIn':
          if (_.includes(data.username, 'Google')) {
            setLoading({ google: true });
          } else if (_.includes(data.username, 'Facebook')) {
            setLoading({ facebook: true });
          } else if (_.includes(data.username, 'Apple')) {
            setLoading({ apple: true });
          }
          dispatch(loginRequest());
          break;
        case 'signOut':
          auth.logout();
          break;
        case 'customOAuthState':
          console.log(data);
          break;
        case 'signIn_failure':
          if ((String)(data).includes('UserNotFoundException')) {
            setError({ email: 'User does not exist!', password: '' });
          } else if ((String)(data).includes('NotAuthorizedException')) {
            setError({ email: '', password: 'Incorrect password!' });
          } else {
            setToast(true);
          }
          setLoading({
            signIn: false,
            google: false,
            facebook: false,
            apple: false,
          });
          break;
        default:
          break;
      }
    };
    Hub.listen('auth', listen);

    // Auth.currentAuthenticatedUser()
    //   .catch(() => {
    //     console.log('Not signed in');
    //     setLoading({
    //       signIn: false,
    //       google: false,
    //       facebook: false,
    //       apple: false,
    //     });
    //   });

    return () => {
      Hub.remove('auth', listen);
    };
  }, []);

  useEffect(async () => {
    if (auth.isLoginSuccess()) {
      history.push('/overview');
    }
  }, [stateLogin]);

  return (
    <div className="sign-in">

      {/* Left frame */}
      <div className="sign-in__banner">
        <Introduce />
      </div>

      <div className="sign-in-mobile">
        <div className="sign-in-mobile__logo">
          <img src={logo} alt="" />
        </div>
      </div>

      {/* Right frame */}
      <div className="sign-in__form">
        <h2 className="sign-in__form-heading">
          Sign in
          {toast && <ToastError title="Sign in failure!" message="Please try again!" setClose={setToast} />}
        </h2>
        <p className="sign-in__form-description">
          Please fill out all the fields below to sign in to your account.
        </p>
        <EmailForm
          signIn={signIn}
          errorSignIn={errorSignIn}
          loading={loading.signIn}
        />
        <h3 className="sign-in__form-or">
          <b />
          <span>Or</span>
          <b />
        </h3>

        <ButtonCT
          content="Sign In with Google"
          outlineBtn
          textDark
          icon={iconGoogle}
          onClick={() => {
            handleGoogleLogin();
            setLoading({ google: true });
          }}
          loading={loading.google}
        />
        <ButtonCT
          content="Sign In with Facebook"
          outlineBtn
          textBlue
          icon={iconFacebook}
          onClick={() => {
            handleFacebookLogin();
            setLoading({ facebook: true });
          }}
          loading={loading.facebook}
        />
        <ButtonCT
          content="Sign In with Apple"
          outlineBtn
          textDark
          icon={iconApple}
          onClick={() => {
            getUser();
            setLoading({ apple: true });
          }}
          loading={loading.apple}
        />

        <p className="sign-in__form-policy">
          By signing in, you agree to our
          {' '}
          <strong>Privacy policy</strong>
          {' '}
          and
          {' '}
          <strong>Terms of use</strong>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
