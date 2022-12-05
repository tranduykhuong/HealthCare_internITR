import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { avatar } from '../../../../../assets/images/jpg';
import { iconArrowRight } from '../../../../../assets/images/svg';
import './styles.scss';
import ButtonCT from '../../../buttonCT';


const RightSideInfo = ({ setShow, signOut }) => {
  const me = useSelector(state => state.login);
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    age: '',
  });

  useEffect(() => {
    if (me.isProfileCompleted) {
      setInfo({
        firstName: me.firstName || '',
        lastName: me.lastName || '',
        weight: parseInt(+me.weight, 10) || '',
        height: parseInt(+me.height, 10) || '',
        avatar: me.avatar,
        age:
          new Date().getFullYear() - new Date(me.dateOfBirth).getFullYear()
          || '',
      });
    }
  }, [me]);

  return (
    <div className="info">
      <div
        className="info__arrow"
        onClick={() => setShow(0)}
        onMouseUp={() => {}}
        role="presentation"
      >
        <img
          src={iconArrowRight}
          alt="arrow-right"
          width="12px"
          height="14px"
        />
      </div>
      <div className="info__content">
        <div className="info__content-avatar">
          <img src={info?.avatar || avatar} alt="avatar" width="120px" height="120px" />
        </div>
        <h2 className="info__content-name">
          {`${info.firstName} ${info.lastName}`}
        </h2>
        <h3 className="info__content-job">Bioheart Management</h3>
        <div className="info__content-informations">
          <div className="weight item">
            <h4>Weight</h4>
            <p>
              {info.weight}
              {' '}
              kg
            </p>
          </div>
          <div className="height item">
            <h4>Height</h4>
            <p>
              {info.height}
              {' '}
              cm
            </p>
          </div>
          <div className="age item">
            <h4>Age</h4>
            <p>
              {info.age}
              {' '}
              years
            </p>
          </div>
        </div>
        <Link to="/edit-profile" className="info__content-btn" onClick={() => setShow(0)}>
          <ButtonCT content="Edit Profile" primary />
        </Link>
      </div>
      <div className="info__content-btn">
        <ButtonCT content="Sign out" outlineBtn pinkColor onClick={signOut} />
      </div>
    </div>
  );
};

RightSideInfo.defaultProps = {
  setShow: null, signOut: null,
};

RightSideInfo.propTypes = {
  setShow: PropTypes.func,
  signOut: PropTypes.func,
};

export default RightSideInfo;
