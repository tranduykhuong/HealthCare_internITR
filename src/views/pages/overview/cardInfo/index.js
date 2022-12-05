import React from 'react';
import './styles.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';


const Card = (props) => {
  const {
    icon, title, value, unit,
  } = props;
  return (
    <div className="mycard">
      <div className="mycard__icon">
        <img src={icon} alt="" />
      </div>
      <h3 className="mycard__title">{title}</h3>

      <div className="mycard__value-field">
        <p className={cx('mycard__value')}>{value}</p>
        <p className="mycard__unit">{unit}</p>
      </div>
    </div>
  );
};

Card.defaultProps = {
  icon: '', title: '', value: '', unit: '',
};

Card.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  unit: PropTypes.string,
};

export default Card;
