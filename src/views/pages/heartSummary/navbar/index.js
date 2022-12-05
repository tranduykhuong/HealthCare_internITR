import React from 'react';
import cx from 'classnames';
import './styles.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataHrRecoil, typeRateRecoil } from '../recoil';
import { HR_SUMMARY_CONSTANTS } from '../../../../constants';


const NavbarHeartSummary = () => {
  const [typeRate, settypeRate] = useRecoilState(typeRateRecoil);
  const setData = useSetRecoilState(dataHrRecoil);

  return (
    <ul className="navbarHR">
      <li
        className={cx(`navbarHR__item ${typeRate === HR_SUMMARY_CONSTANTS.ALL ? 'active' : ''}`)}
        onClick={() => {
          settypeRate(HR_SUMMARY_CONSTANTS.ALL);
          setData(undefined);
        }}
        onKeyUp={() => {}}
        role="presentation"
      >
        Heart rate
      </li>
      <li
        className={cx(`navbarHR__item ${typeRate === HR_SUMMARY_CONSTANTS.STANDING ? 'active' : ''}`)}
        onClick={() => {
          settypeRate(HR_SUMMARY_CONSTANTS.STANDING);
          setData(undefined);
        }}
        onKeyUp={() => {}}
        role="presentation"
      >
        Standing Heart rate
      </li>
      <li
        className={cx(`navbarHR__item ${typeRate === HR_SUMMARY_CONSTANTS.RESTING ? 'active' : ''}`)}
        onClick={() => {
          settypeRate(HR_SUMMARY_CONSTANTS.RESTING);
          setData(undefined);
        }}
        onKeyUp={() => {}}
        role="presentation"
      >
        Resting Heart rate
      </li>
      <li
        className={cx(`navbarHR__item ${typeRate === HR_SUMMARY_CONSTANTS.LYING ? 'active' : ''}`)}
        onClick={() => {
          settypeRate(HR_SUMMARY_CONSTANTS.LYING);
          setData(undefined);
        }}
        onKeyUp={() => {}}
        role="presentation"
      >
        Heart rate variability
      </li>
      <li
        className={cx(`navbarHR__item ${typeRate === HR_SUMMARY_CONSTANTS.WALKING ? 'active' : ''}`)}
        onClick={() => {
          settypeRate(HR_SUMMARY_CONSTANTS.WALKING);
          setData(undefined);
        }}
        onKeyUp={() => {}}
        role="presentation"
      >
        HR during activity
      </li>
    </ul>
  );
};


export default NavbarHeartSummary;
