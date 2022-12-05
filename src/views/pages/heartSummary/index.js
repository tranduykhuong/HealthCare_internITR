import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import './styles.scss';
import NavbarHeartSummary from './navbar';
import TypeTimeOptions from './typeTimeOptions';
import ChangeTime from './changeTime';
import ChartHandle from './chartHandle';
import { typeRateRecoil } from './recoil';
import { ABOUT } from './handler';

const HeartSummaryRecoil = () => {
  const typeRate = useRecoilValue(typeRateRecoil);

  return (
    <div className="summary">
      <div className="summary__heading">
        <h2>Heart Summary</h2>
        <p />
      </div>
      <div className="summary__content">
        <NavbarHeartSummary />
        <div className="content">
          <TypeTimeOptions />
          <ChangeTime />
          <ChartHandle />
          <div className="aboutHr">
            <h3>{ABOUT[typeRate]?.title}</h3>
            <p>{ABOUT[typeRate]?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeartSummary = () => (
  <RecoilRoot>
    <HeartSummaryRecoil />
  </RecoilRoot>
);

export default HeartSummary;
