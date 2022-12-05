import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import moment from 'moment';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTimeRecoil, typeTimeRecoil } from './recoil';
import { formatTime } from './handler';


const ChangeTime = () => {
  const [current, setCurrent] = useRecoilState(currentTimeRecoil);
  const type = useRecoilValue(typeTimeRecoil);

  return (
    <div className="time-option">
      <IoIosArrowBack
        className="time-option__icon"
        onClick={() => setCurrent(moment(current).add(-1, type))}
      />
      <div className="time-option__time">{formatTime()}</div>
      <IoIosArrowForward
        className={cx(`time-option__icon ${moment() < moment(current).add(1, type) ? 'disabled' : ''}`)}
        onClick={() => setCurrent(moment(current).add(1, type))}
      />
    </div>
  );
};


ChangeTime.propTypes = {

};


export default ChangeTime;
