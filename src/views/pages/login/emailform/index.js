/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { Amplify } from '@aws-amplify/core';
import ButtonCT from '../../../components/buttonCT';
import InputCT from '../../../components/inputCT';
import awsmobile from '../../../../awsmobile';
// import awsmobile from '../../../../aws-exports';
import useMergeState from '../../../../utils/hooks/useMergeState';
import { handleValidateEmail, handleValidatePassword } from './handler';

Amplify.configure(awsmobile);

const EmailForm = ({ signIn, errorSignIn, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useMergeState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value);
    else setPassword(e.target.value);
    setErrors({
      email: '',
      password: '',
    });
  };

  const handleBlur = (e) => {
    if (e.target.name === 'email') {
      const err = handleValidateEmail(e.target.value);
      setErrors(err);
    } else {
      const err = handleValidatePassword(e.target.value);
      setErrors(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let err = handleValidatePassword(password);
    err = { ...err, ...handleValidateEmail(email) };
    setErrors(err);

    if (errors.email === '' && errors.password === '' && email !== '') {
      // handle submit
      // Account: 'nhabanh@itrvn.com', password: '111111111'

      // Account: biohearttest0@yopmail.com
      // Pass: 00000000
      signIn(email.trim(), password.trim());
    }
  };

  useEffect(() => {
    setErrors(errorSignIn);
  }, [errorSignIn]);

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <InputCT
        label="Email"
        placeholder="Enter your email"
        name="email"
        type="text"
        message={errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <InputCT
        label="Password"
        placeholder="Enter your password"
        name="password"
        type="password"
        message={errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className="email-form__forgot-password">Forgot Password?</div>

      <ButtonCT
        content="Sign in"
        primary
        type="submit"
        value="Submit"
        loading={loading}
      />
    </form>
  );
};

EmailForm.defaultProps = {
  signIn: null,
  errorSignIn: {},
  loading: undefined,
};

EmailForm.propTypes = {
  signIn: PropTypes.func,
  errorSignIn: PropTypes.object,
  loading: PropTypes.bool,
};

export default EmailForm;
