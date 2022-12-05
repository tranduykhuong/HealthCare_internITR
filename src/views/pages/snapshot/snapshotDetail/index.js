import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import * as _ from 'lodash';
import { RiDeleteBin5Line, RiHeartPulseFill } from 'react-icons/ri';
import { VscFilePdf } from 'react-icons/vsc';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import moment from 'moment';
import { currentSnapshotRecoil } from '../recoil';
import ButtonCT from '../../../components/buttonCT';
import SnapshotTag from '../snapshotTag';
import { ecgIcon, penEdit } from '../../../../assets/images/svg';
import SnapshotChart from './snapshotChart';
import './styles.scss';
import ModalCT from '../../../components/modalCT';
import EditNotes from '../editNotes';

const SnapshotDetail = () => {
  const currentSnapshot = useRecoilValue(currentSnapshotRecoil);
  const time = moment(currentSnapshot?.start).format('MMM DD, hh:mm:ss A');
  const [openEditNote, setOpenEditNote] = useState(false);

  return (
    <div className="snapshot-detail">
      {currentSnapshot ? (
        <>
          {openEditNote && (
          <ModalCT>
            <EditNotes
              setOpen={setOpenEditNote}
            />
          </ModalCT>
          )}

          <div className="snapshot-detail__heading">
            <h3>Snapshot detail</h3>
            <div>
              <RiDeleteBin5Line className="icon" />
              <VscFilePdf className="icon" />
            </div>
          </div>

          <div className="snapshot-detail__content">
            <div className="heading">
              <h3>{time}</h3>
              {currentSnapshot?.star
                ? <AiFillStar className="heading__star starIconFill" />
                : <AiOutlineStar className="heading__star" />}
            </div>

            <div className="heart-rate">
              <div className="heart-rate__figure">
                <RiHeartPulseFill className="icon" />
                {currentSnapshot?.minHeartRate !== -1 ? (
                  <>
                    <strong>{`${currentSnapshot?.minHeartRate} - ${currentSnapshot?.maxHeartRate}`}</strong>
                    <p>bpm</p>
                  </>
                ) : (
                  <h2>No beat</h2>
                )}
              </div>
              <div
                className="heart-rate__btn"
                onClick={() => setOpenEditNote(true)}
                onMouseUp={() => {}}
                role="presentation"
              >
                <ButtonCT
                  content="Edit notes"
                  small
                  outlineBtn
                  iconRight={penEdit}
                />
              </div>
            </div>

            <div className="chart">
              <SnapshotChart
                start={currentSnapshot?.start}
                duration={currentSnapshot?.duration}
              />
            </div>

            <div className="tags">
              {_.map(currentSnapshot?.tags,
                (tag, idx) => (
                  <div key={idx}>
                    <SnapshotTag tag={tag} />
                  </div>
                ))}
            </div>

            {currentSnapshot?.note && (
              <div className="description">
                {currentSnapshot?.note}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="snapshot-detail__empty">
          <img src={ecgIcon} alt="detail-frame" />
          <h4>Select an item in snapshot list to read</h4>
          <p>Nothing is selected</p>
        </div>
      )}
    </div>
  );
};

SnapshotDetail.propTypes = {};

export default SnapshotDetail;
