/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import cx from 'classnames';
import './styles.scss';
import * as _ from 'lodash';
import InputData from './inputdata';
import { createTimeline, dataProcessing, parstNextTime } from './handler';

const Schedule = () => {
  const [lists, setLists] = useState([]);
  const [listActive, setListActive] = useState([]);
  const [errors, setErrors] = useState({});
  const [dataTime, setDataTime] = useState({
    start: '',
    end: '',
    duration: '',
  });

  const handleSetData = (name, value) => {
    setDataTime({ ...dataTime, [name]: value });
  };

  const handleShow = () => {
    let allErrors = {};
    let valid = true;

    // Check all invalid data
    for (const ele in dataTime) {
      if (dataTime[ele] === '') {
        allErrors = { ...allErrors, [ele]: 'This is a required field!' };
        valid = false;
      }
    }

    if (!valid) {
      setErrors(allErrors);
      return;
    }

    const timeline = createTimeline(dataTime.start, dataTime.end);
    setListActive([]);
    setLists(dataProcessing(timeline, dataTime));
  };

  const handleClickGroup = (idGroup) => {
    if (lists[idGroup][0].disable) return;
    const active = {
      startTime: lists[idGroup][0].time,
      endTime: parstNextTime(
        lists[idGroup][lists[idGroup].length - 1].time,
        30,
      ),
    };
    _.forEach(lists[idGroup], item => (item.disable = true));
    setListActive([...listActive, active]);
  };

  return (
    <div className="my-schedule">
      <h2 className="heading">Timeline</h2>

      <InputData
        setData={handleSetData}
        allErrors={errors}
        handleShow={handleShow}
      />

      <div className="content">
        {lists.length && (
          <div className="content__list content--list">
            {_.map(lists, (group, idxGroup) => (
              <ul
                className="content__list-group"
                key={idxGroup}
                onClick={() => handleClickGroup(idxGroup)}
                onMouseUp={() => {}}
                role="presentation"
              >
                {_.map(group, (item, idxBlock) => (
                  <li
                    className={cx(
                      `content__list-item ${item.disable ? 'disable' : ''}`,
                    )}
                    key={idxGroup * 10 + idxBlock}
                  >
                    {item.time}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
        <div className="content__btn">

          {listActive.length && (
            <>
              <h3 className="book-time">Book time</h3>
              <ul className="content__active content--list">
                {_.map(listActive, (item, idx) => (
                  <li className="content__list-item" key={idx}>
                    {item.startTime}
                    {' '}
                    -
                    {' '}
                    {item.endTime}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
