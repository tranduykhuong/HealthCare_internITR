/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const CardChart = (props) => {
  const {
    title, status, chart, icon, time,
  } = props;
  return (
    <div className="card-chart">
      <div className="content">
        {icon && (
          <div className="content__icon">
            <img src={icon} alt="icon" />
          </div>
        )}
        <h3 className="content__title">{title}</h3>
        <p className="content__status">{status}</p>
      </div>
      {chart && <div className="chart">{chart}</div>}
      <div className="time">{time}</div>
    </div>
  );
};

CardChart.defaultProps = {
  title: '',
  status: '',
  chart: undefined,
  icon: '',
  time: '',
};

CardChart.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  chart: PropTypes.object,
  icon: PropTypes.string,
  time: PropTypes.string,
};

export default CardChart;
