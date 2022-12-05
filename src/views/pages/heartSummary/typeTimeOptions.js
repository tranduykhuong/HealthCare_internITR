import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as _ from 'lodash';
import cx from 'classnames';
import { dataHrRecoil, typeRateRecoil, typeTimeRecoil } from './recoil';
import { HR_SUMMARY_CONSTANTS } from '../../../constants';


const TypeTimeOptions = () => {
  const [type, setType] = useRecoilState(typeTimeRecoil);
  const typeRate = useRecoilValue(typeRateRecoil);
  const setData = useSetRecoilState(dataHrRecoil);

  useEffect(() => {
    if (typeRate !== HR_SUMMARY_CONSTANTS.ALL
      && type === 'Hour') {
      setType('Day');
    }
  }, [typeRate]);

  return (
    <div className="type-time">
      {_.map(typeRate === HR_SUMMARY_CONSTANTS.ALL
        ? ['Hour', 'Day', 'Week', 'Month', 'Year']
        : ['Day', 'Week', 'Month', 'Year'], (item, key) => (
          <div
            key={key}
            className={cx(`type-time__item ${type === item ? 'active' : ''}`)}
            onClick={() => {
              if (type !== item) {
                setType(item);
                setData(undefined);
              }
            }}
            onMouseUp={() => {}}
            role="presentation"
          >
            {item}
          </div>
      ))}
    </div>
  );
};


TypeTimeOptions.propTypes = {

};


export default TypeTimeOptions;
