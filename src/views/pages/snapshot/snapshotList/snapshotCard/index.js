/* eslint-disable react/forbid-prop-types */
import React from 'react';
import * as _ from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import './styles.scss';
import SnapshotTag from '../../snapshotTag';


const SnapshotCard = (props) => {
  const {
    time,
    createTime,
    thumbnail,
    minute,
    minHeartRate,
    maxHeartRate,
    tags,
    description,
    star,
    active,
  } = props;

  return (
    <div className={cx(`snapshot-card ${active ? 'card-active' : ''}`)}>
      <div className="date">
        <div className="date__time">
          <AiOutlineClockCircle className="date__icon" />
          <h2>{time}</h2>
        </div>
        <div className="date__createTime">
          <h3>{createTime}</h3>
          <IoIosArrowForward className="date__icon" />
        </div>
      </div>

      <div className="snapshot-chart">
        {star && (
        <div className="snapshot-chart__star">
          <AiFillStar className="starIcon" />
        </div>
        )}
        <div className="snapshot-chart__thumbnail">
          <img src={thumbnail} alt="" />
        </div>
        <div className="snapshot-chart__detail">
          <h3>
            {minute}
            {' '}
            min
          </h3>
          {minHeartRate !== -1 && maxHeartRate !== -1 ? (
            <div className="detail-heart-rate">
              <strong>{`${minHeartRate.toString()} - ${maxHeartRate.toString()}`}</strong>
              <span>bpm</span>
            </div>
          ) : (
            <div className="detail-heart-rate">
              <h3>No beat</h3>
            </div>
          )}
        </div>
      </div>

      <div className="snapshot-tags">
        {_.map(tags, (tag, idx) => (
          <div key={idx}><SnapshotTag tag={tag} /></div>
        ))}
      </div>

      {description && (
      <div className="snapshot-description">
        {description}
      </div>
      )}
    </div>
  );
};

SnapshotCard.defaultProps = {
  time: '',
  createTime: '',
  thumbnail: '',
  minute: 1,
  minHeartRate: -1,
  maxHeartRate: -1,
  tags: [],
  description: '',
  star: undefined,
  active: false,
};

SnapshotCard.propTypes = {
  time: PropTypes.string,
  createTime: PropTypes.string,
  thumbnail: PropTypes.string,
  minute: PropTypes.number,
  minHeartRate: PropTypes.number,
  maxHeartRate: PropTypes.number,
  tags: PropTypes.array,
  description: PropTypes.string,
  star: PropTypes.bool,
  active: PropTypes.bool,
};


export default SnapshotCard;
