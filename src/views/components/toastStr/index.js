import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import './styles.scss';


export const ToastError = ({ title, message, setClose }) => (
  <div className="toast-wrap error-toast">
    <div className="toast-wrap__icon">
      <CgClose className="icon-close" />
    </div>
    <div className="toast-wrap__content">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
    <div
      className="toast-wrap__close"
      onClick={setClose}
      onMouseUp={() => {}}
      role="presentation"
    >
      <CgClose className="icon-close" />
    </div>
  </div>
);

ToastError.defaultProps = {
  title: '',
  message: '',
  setClose: null,
};

ToastError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  setClose: PropTypes.func,
};


export const ToastSuccess = ({ title, message, setClose }) => (
  <div className="toast-wrap success-toast">
    <div className="toast-wrap__icon success-icon">
      <TiTick className="icon-tick" />
    </div>
    <div className="toast-wrap__content">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
    <div
      className="toast-wrap__close"
      onClick={setClose}
      onMouseUp={() => {}}
      role="presentation"
    >
      <CgClose className="icon-close" />
    </div>
  </div>
);

ToastSuccess.defaultProps = {
  title: '',
  message: '',
  setClose: null,
};

ToastSuccess.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  setClose: PropTypes.func,
};
