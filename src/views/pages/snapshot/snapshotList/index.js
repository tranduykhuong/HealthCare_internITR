import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import cx from 'classnames';
import moment from 'moment';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as _ from 'lodash';
import fetchSnapshots from '../../../../services/apollo/functions/fetchSnapshots';
import {
  cookiesRecoil, currentSnapshotRecoil, cursorRecoil, snapshotsListRecoil, filterRecoil, typeRecoil,
} from '../recoil';
import { LoadingDonut } from '../../../components/loading';
import './styles.scss';
import { frameListSnapshot } from '../../../../assets/images/jpg';
import { handleCookies } from '../handler';
import SnapshotCard from './snapshotCard';

const SnapshotStatusEnum = {
  Active: 'Active',
  ExceedLimit: 'ExceedLimit',
  Inactive: 'Inactive',
  Retry: 'Retry',
};
let filter;

const SnapshotList = () => {
  const endItem = useRef();
  const [type, setType] = useRecoilState(typeRecoil);
  const [data, setData] = useRecoilState(snapshotsListRecoil);
  const [cookies, setCookies] = useRecoilState(cookiesRecoil);
  const [cursor, setCursor] = useRecoilState(cursorRecoil);
  const [currentSnapshot, setCurrentSnapshot] = useRecoilState(currentSnapshotRecoil);
  const recoilFilter = useRecoilValue(filterRecoil);

  useEffect(async () => {
    filter = {
      filter: { status: SnapshotStatusEnum.Active },
      limit: 5,
      limitStrip: true,
    };
    try {
      setData(undefined);
      if (type === 'all') {
        filter.sortBy = 'start';
      } else if (type === 'recent') {
        filter.sortBy = 'createdTime';
      } else if (type === 'star') {
        filter.filter.star = true;
      } else if (type === 'filter') {
        filter.filter.tags = recoilFilter?.tags.length ? recoilFilter?.tags : undefined;
        filter.filter.start = recoilFilter?.date ? moment(recoilFilter?.date).valueOf() : undefined;
        filter.filter.duration = recoilFilter?.duration.length ? recoilFilter?.duration : undefined;
        filter.filter.star = recoilFilter?.star;
      }

      const data = await fetchSnapshots(filter);

      const { policy, keyPairId, signature } = handleCookies(data?.cookies);
      setData(data.snapshots);
      setCursor(data.cursor);
      setCookies({
        policy,
        keyPairId,
        signature,
      });
    } catch (err) {
      console.log(err);
    }
  }, [type, recoilFilter]);

  useEffect(() => {
    if (!cursor) { return null; }

    const options = {
      root: document.getElementById('list'),
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        try {
          filter.cursor = cursor;
          const newData = await fetchSnapshots(filter);

          const temp = data;
          setData([...temp, ...newData.snapshots]);
          setCursor(newData.cursor);
        } catch (err) {
          console.log(err);
        }
      }
    }, options);
    if (endItem?.current && data?.length) {
      observer.observe(endItem?.current);
    }

    return () => observer.disconnect();
  }, [cursor]);

  return (
    <div className="snapshot-list">
      <div className="heading">
        {type === 'filter' ? (
          <div className={cx('heading__item')}>
            Result
          </div>
        ) : (
          <>
            <div
              className={cx(
                `heading__item ${type === 'recent' ? 'recent-active' : ''}`,
              )}
              onClick={() => {
                setType('recent');
                setCurrentSnapshot(undefined);
              }}
              onMouseUp={() => {}}
              role="presentation"
            >
              Recent
            </div>
            <div
              className={cx(
                `heading__item ${type === 'all' ? 'all-active' : ''}`,
              )}
              onClick={() => {
                setType('all');
                setCurrentSnapshot(undefined);
              }}
              onMouseUp={() => {}}
              role="presentation"
            >
              All Snapshots
            </div>
            {type === 'star' ? (
              <AiFillStar className="heading__star star-yellow" />
            ) : (
              <AiOutlineStar
                className="heading__star"
                onClick={() => setType('star')}
              />
            )}
          </>
        )}
      </div>

      <div className="list" id="list">
        {!data && (
        <div className="list__loading">
          <LoadingDonut medium />
        </div>
        )}
        {_.map(data, (item, idx) => (
          <div
            className="item"
            key={idx}
            onClick={() => {
              setCurrentSnapshot(item);
            }}
            onMouseUp={() => {}}
            role="presentation"
          >
            <SnapshotCard
              active={currentSnapshot?.url === item?.url ? true : undefined}
              time={moment(item?.start).format('MMM DD, hh:mm:ss A')}
              createTime={moment(item?.createTime).format('ddd hh:mm A')}
              thumbnail={`${item?.thumbnail}?Policy=${cookies?.policy}&Key-Pair-Id=${cookies?.keyPairId}&Signature=${cookies.signature}`}
              minute={item?.duration / 60}
              star={item?.star}
              minHeartRate={item?.minHeartRate}
              maxHeartRate={item?.maxHeartRate}
              tags={item?.tags}
              description={item?.note}
            />
          </div>
        ))}
        {data?.length ? (
          cursor && (
          <div className="list__load-more item" ref={endItem}>
            <LoadingDonut small />
          </div>
          )
        ) : (
          <img src={frameListSnapshot} alt="frame-list-snapshot" width="100%" />
        )}
      </div>
    </div>
  );
};

SnapshotList.propTypes = {};

export default SnapshotList;
