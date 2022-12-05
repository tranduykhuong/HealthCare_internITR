/* eslint-disable no-useless-escape */
import React from 'react';
import ButtonCT from '../../../components/buttonCT';
import InputCT from '../../../components/inputCT';
import './styles.scss';

class EmailForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: '',
      },
      errors: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  handleValidateEmail = (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!value) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: 'This is a required field!',
        },
      });
      return { email: 'This is a required field!' };
    } if (!regex.test(value)) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: 'This in not a valid email format!',
        },
      });
      return { email: 'This in not a valid email format!' };
    }
    this.setState({ errors: { ...this.state.errors, email: '' } });
    return { email: '' };
  };

  handleValidatePassword = (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!value) {
      this.setState({
        errors: {
          ...this.state.errors,
          password: 'This is a required field!',
        },
      });
      return { password: 'This is a required field!' };
    } if (!regex.test(value)) {
      this.setState({
        errors: {
          ...this.state.errors,
          password:
            'At least 8 characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case character',
        },
      });
      return {
        password:
          'At least 8 characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case character',
      };
    }
    this.setState({ errors: { ...this.state.errors, password: '' } });
    return { password: '' };
  };

  handleSubmit = () => {
    let err = this.handleValidatePassword(this.state.data.password);
    err = { ...err, ...this.handleValidateEmail(this.state.data.email) };
    this.setState({ errors: err });
    if (
      this.state.errors.email === ''
      && this.state.errors.password === ''
      && this.state.data.email !== ''
    ) {
      // handle submit
      console.log('submit');
    }
  };

  render() {
    return (
      <div className="email-form">
        <InputCT
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="text"
          message={this.state.errors.email}
          onChange={this.handleChange}
          onBlur={this.handleValidateEmail}
        />

        <InputCT
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          message={this.state.errors.password}
          onChange={this.handleChange}
          onBlur={this.handleValidatePassword}
        />

        <div className="email-form__forgot-password">Forgot Password?</div>

        <ButtonCT content="Sign in" primary onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default EmailForm;
