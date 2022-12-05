import React, { memo, useState } from 'react';
import './styles.scss';
import cx from 'classnames';
import { Auth } from '@aws-amplify/auth';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RightSideInfo from './rightsideInfo';
import { logoutRequest } from '../../../../redux/actions/login';
import { avatar } from '../../../../assets/images/jpg';
import {
  iconArrowLeft,
  iconEdit,
  iconLogout,
} from '../../../../assets/images/svg';
import auth from '../../../../utils/auth';

const RigthSideBar = () => {
  const [showInfo, setShowInfo] = useState(-1);
  const history = useHistory();
  const dispatch = useDispatch();
  const me = auth.me();

  const signOut = () => {
    dispatch(logoutRequest());
    try {
      Auth.signOut().then(() => {
        history.push('/login');
      });
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <>
      <div className="side-bar">
        <div
          className="side-bar__arrow"
          onClick={() => setShowInfo(1)}
          onMouseUp={() => {}}
          role="presentation"
        >
          <img
            src={iconArrowLeft}
            alt="arrow-left"
            width="12px"
            height="14px"
          />
        </div>
        <div className="side-bar__content">
          <div
            className={cx(`content__avatar ${showInfo === 1 ? 'show' : ''}`)}
          >
            <img src={me?.avatar || avatar} alt="avatar" />
          </div>
          <Link to="/edit-profile" className="content__edit icon">
            <img
              src={iconEdit}
              alt="icon-edit"
              width="14px"
              height="14px"
            />
          </Link>
          <span />
          <div
            className="content__logout icon"
            onClick={signOut}
            onMouseUp={() => {}}
            role="presentation"
          >
            <img
              src={iconLogout}
              alt="icon-logout"
              width="14px"
              height="14px"
            />
          </div>
        </div>
      </div>
      <div
        className={cx(
          `right-side-info 
          ${showInfo === 1 ? 'show' : ''} 
          ${showInfo === 0 ? 'hide' : ''}`,
        )}
      >
        <RightSideInfo setShow={setShowInfo} signOut={signOut} />
      </div>
    </>
  );
};

export default memo(RigthSideBar);
