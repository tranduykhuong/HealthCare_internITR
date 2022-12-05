import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';


const ErrorMessage = props => (<div className="error">{props.message}</div>);


ErrorMessage.defaultProps = {
  message: '',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};


export default ErrorMessage;
