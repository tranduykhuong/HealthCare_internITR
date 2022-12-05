import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import cx from 'classnames';

export const Loading = () => (
  <div className="load-wrapp">
    <div className="load">
      <div className="ring" />
    </div>
  </div>
);

export const LoadingDonut = ({ small, large }) => (
  <div className={cx('donut', {
    large,
    small,
  })}
  />
);


LoadingDonut.defaultProps = {
  small: undefined,
  large: undefined,
};

LoadingDonut.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
};
