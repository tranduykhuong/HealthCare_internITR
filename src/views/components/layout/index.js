/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import LeftSideMenu from './leftsideMenu';
import RigthSideBar from './rightsideBar';
import './styles.scss';

const Layout = props => (
  <div className="layout">
    <LeftSideMenu />
    <div className="layout__center">{props.children}</div>
    <RigthSideBar />
  </div>
);

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
