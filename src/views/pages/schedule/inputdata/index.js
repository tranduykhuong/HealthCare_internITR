/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputCT from '../../../components/inputCT';
import './styles.scss';
import ButtonCT from '../../../components/buttonCT';

const InputData = (props) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value === '') {
      if (e.target.name !== 'startDis' && e.target.name !== 'endDis') { setErrors({ ...errors, [e.target.name]: 'This is a required field!' }); }
    } else if (value < +e.target.min || value > +e.target.max) {
      setErrors({ ...errors, [e.target.name]: 'Error range!' });
    } else {
      setErrors({ ...errors, [e.target.name]: '' });
      props.setData(e.target.name, value);
    }
  };

  useEffect(() => {
    setErrors(props.allErrors);
  }, [props.allErrors]);

  return (
    <>
      <div className="input">
        <div className="input__item">
          <InputCT
            label="Start"
            placeholder="Enter hour"
            name="start"
            type="number"
            min="0"
            max="24"
            message={errors.start}
            onChange={handleChange}
            border
          />
        </div>
        <div className="input__item">
          <InputCT
            label="End"
            placeholder="Enter hour"
            name="end"
            type="number"
            min="0"
            max="24"
            message={errors.end}
            onChange={handleChange}
            border
          />
        </div>
        <div className="input__item">
          <InputCT
            label="Duration"
            placeholder="1 - 4"
            name="duration"
            type="number"
            min="1"
            max="4"
            message={errors.duration}
            onChange={handleChange}
            border
          />
        </div>
      </div>
      <div className="show-btn">
        <div className="input__disable">
          <h3>Disable</h3>
          <div className="input__list">
            <div className="input__item">
              <InputCT
                label="Start"
                placeholder="Enter hour"
                name="startDis"
                type="number"
                min="0"
                max="24"
                message={errors.startDis}
                onChange={handleChange}
                border
              />
            </div>
            <div className="input__item">
              <InputCT
                label="End"
                placeholder="Enter hour"
                name="endDis"
                type="number"
                min="0"
                max="24"
                message={errors.endDis}
                onChange={handleChange}
                border
              />
            </div>
          </div>
        </div>
        <ButtonCT content="Show" primary onClick={props.handleShow} />
      </div>
    </>
  );
};

InputData.defaultProps = {
  setData: null,
  allErrors: {},
  handleShow: null,
};

InputData.propTypes = {
  setData: PropTypes.func,
  handleShow: PropTypes.func,
  allErrors: PropTypes.object,
};

export default InputData;
