import React, { useState } from 'react';
import cx from 'classnames';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import PropTypes from 'prop-types';
import ErrorMessage from '../errormessage';
import './styles.scss';

const InputCT = (props) => {
  const {
    label, message, type, border, unit, ...passProps
  } = props;

  const [Type, setType] = useState(type);

  const handleClickEye = () => {
    if (Type === 'password') setType('text');
    else setType('password');
  };

  return (
    <div className="wrap">
      {label && <span className="wrap__label">{label}</span>}

      <div className="wrap__input">
        <input
          className={cx(`input ${message ? 'error' : ''}`, { border })}
          type={Type}
          {...passProps}
        />
        {type === 'password' && (
          <div
            className="input-eye"
            onClick={() => handleClickEye()}
            onMouseUp={() => {}}
            role="presentation"
          >
            {Type === 'password' ? (
              <BsEyeSlash className="input-eye__icon" />
            ) : (
              <BsEye className="input-eye__icon" />
            )}
          </div>
        )}

        {unit && <span className="unit">{unit}</span>}
      </div>

      <ErrorMessage message={message} />
    </div>
  );
};

InputCT.defaultProps = {
  label: '', message: '', type: '', border: undefined, unit: '',
};

InputCT.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  border: PropTypes.bool,
  unit: PropTypes.string,
};

export default InputCT;
