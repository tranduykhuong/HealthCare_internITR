/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ModalCT = props => (
  <div className="modalCT">
    <div className="modalCT__content">
      {props.children}
    </div>
  </div>
);

ModalCT.defaultProps = {
  children: {},
};

ModalCT.propTypes = {
  children: PropTypes.object,
};


export default ModalCT;
