import React from 'react';
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

class LogIn extends React.Component {
  render() {
    return (
      <div className="sign-in">
        {/* Left frame */}
        <div className="sign-in__banner"><Introduce /></div>

        <div className="sign-in-mobile">
          <div className="sign-in-mobile__logo">
            <img src={logo} alt="" />
          </div>
        </div>

        {/* Right frame */}
        <div className="sign-in__form">
          <h2 className="sign-in__form-heading">Sign in</h2>
          <p className="sign-in__form-description">
            Please fill out all the fields below to sign in to your account.
          </p>
          <EmailForm />

          <h3 className="sign-in__form-or">
            <b />
            <span>Or</span>
            <b />
          </h3>

          <ButtonCT
            content="Sign In with Google"
            href="https://www.google.com/"
            google
            icon={iconGoogle}
            target="_blank"
          />
          <ButtonCT
            content="Sign In with Facebook"
            href="https://facebook.com/"
            facebook
            icon={iconFacebook}
            target="_blank"
          />
          <ButtonCT
            content="Sign In with Apple"
            href="https://www.apple.com/vn/"
            apple
            icon={iconApple}
            target="_blank"
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
  }
}

export default LogIn;
