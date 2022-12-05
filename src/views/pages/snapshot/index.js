import React from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import './styles.scss';
import SnapshotList from './snapshotList';
import SnapshotDetail from './snapshotDetail';
import SnapshotSearch from './snapshotSearch';


const SnapshotRecoil = () => (
  <>
    <SnapshotSearch />
    <div className="snapshot-content">
      <SnapshotList />
      <SnapshotDetail />
    </div>
  </>
);


SnapshotRecoil.propTypes = {

};

const Snapshot = () => (
  <RecoilRoot>
    <SnapshotRecoil />
  </RecoilRoot>
);

export default Snapshot;
