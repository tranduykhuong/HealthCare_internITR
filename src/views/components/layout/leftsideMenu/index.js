import React, { memo, useRef, useState } from 'react';
import './styles.scss';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import {
  iconHealth,
  iconHealthActive,
  iconHeart,
  iconHeartActive,
  iconOverview,
  iconOverviewActive,
  iconSnapshot,
  iconSnapshotActive,
  iconSupport,
  logo,
} from '../../../../assets/images/svg';

const LeftSideMenu = () => {
  const refLine = useRef();
  const path = useLocation().pathname;

  const handleActiveLine = (e) => {
    if (refLine.current !== undefined && e) {
      refLine.current.style.top = `${e.offsetTop}px`;
    }
  };

  return (
    <div className="menu">
      <div className="menu__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="menu__list">
        <Link
          to="/overview"
          className={cx(`menu__list-item ${path === '/overview' ? 'item--active' : ''}`)}
          ref={(e) => {
            if (path === '/overview') handleActiveLine(e);
          }}
        >
          {path === '/overview' ? (
            <img
              src={iconOverviewActive}
              alt="iconOverviewActive"
              className="menu__list-icon"
            />
          ) : (
            <img
              src={iconOverview}
              alt="iconOverview"
              className="menu__list-icon"
            />
          )}
          <p>Overview</p>
        </Link>
        <Link
          className={cx(`menu__list-item ${path === '/heart-summary' ? 'item--active' : ''}`)}
          ref={(e) => {
            if (path === '/heart-summary') handleActiveLine(e);
          }}
          to="/heart-summary"
        >
          {path === '/heart-summary' ? (
            <img
              src={iconHeartActive}
              alt="iconHeartActive"
              className="menu__list-icon"
            />
          ) : (
            <img src={iconHeart} alt="iconHeart" className="menu__list-icon" />
          )}
          <p>Heart Summary</p>
        </Link>
        <Link
          to="/snapshot"
          className={cx(`menu__list-item ${path === '/snapshot' ? 'item--active' : ''}`)}
          ref={(e) => {
            if (path === '/snapshot') handleActiveLine(e);
          }}
        >
          {path === '/snapshot' ? (
            <img
              src={iconSnapshotActive}
              alt="iconSnapshotActive"
              className="menu__list-icon"
            />
          ) : (
            <img
              src={iconSnapshot}
              alt="iconSnapshot"
              className="menu__list-icon"
            />
          )}
          <p>Snapshot</p>
        </Link>
        <Link
          to="/heart-report"
          className={cx(`menu__list-item ${path === '/heart-report' ? 'item--active' : ''}`)}
          ref={(e) => {
            if (path === '/heart-report') handleActiveLine(e);
          }}
        >
          {path === '/heart-report' ? (
            <img
              src={iconHealthActive}
              alt="iconHealthActive"
              className="menu__list-icon"
            />
          ) : (
            <img
              src={iconHealth}
              alt="iconHealth"
              className="menu__list-icon"
            />
          )}
          <p>Health Report</p>
        </Link>
        <Link
          to="/support"
          className={cx(`menu__list-item ${path === '/support' ? 'item--active' : ''}`)}
          ref={(e) => {
            if (path === '/support') handleActiveLine(e);
          }}
        >
          <img
            src={iconSupport}
            alt="iconSupport"
            className="menu__list-icon"
          />
          <p>Support</p>
        </Link>
        <div className="line" ref={refLine} />
      </div>
    </div>
  );
};

export default memo(LeftSideMenu);
