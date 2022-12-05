/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import moment from 'moment';
import Chart from './chart';
import './styles.scss';
import useMergeState from '../../../../../utils/hooks/useMergeState';
import getEcgData from './ecgMapperHandler';
import { LoadingDonut } from '../../../../components/loading';
import snapshotDetailStorage from '../storage';
import { handleDataSnapshotDetail } from '../handler';

const SnapshotChart = ({ start, duration }) => {
  const valueRef = useRef();
  const inputRef = useRef();
  const [state, setState] = useMergeState({
    id: undefined,
    duration: 180,
    percent: 0,
    range: [0, 60000],
    data: undefined,
  });

  const handleRange = (e) => {
    setState({ percent: e.target.value });
  };

  useEffect(() => {
    const handleScrollChart = (e) => {
      setState({ percent: e.target.scrollLeft / 75 });
    };
    const chartRef = document.querySelector('.snapshot-chart__chart');
    chartRef.addEventListener('scroll', handleScrollChart);

    return () => chartRef.removeEventListener('scroll', handleScrollChart);
  }, []);

  useEffect(() => {
    const chartRef = document.querySelector('.snapshot-chart__chart');
    chartRef.scrollLeft = state.percent * 75;

    if (valueRef.current) {
      valueRef.current.style.setProperty('left', `${state.percent * 100 / state.duration}%`);
      valueRef.current.style.setProperty('opacity', 1);
    }
    if (inputRef.current) {
      inputRef.current.style
        .setProperty('background', `linear-gradient(90deg, #9ACF77 ${state.percent * 100 / state.duration}%, #E6E9EB 0)`);
    }
  }, [state.percent]);

  useEffect(async () => {
    setState({ data: undefined, percent: 0 });
    inputRef.current.style.setProperty('background', 'linear-gradient(90deg, #9ACF77 0%, #E6E9EB 0)');

    try {
      if (start && duration) {
        const tmp = [];
        let data;

        for (let i = 0; i <= duration / 60; i += 1) {
          tmp.push(i * 1000 * 60);
        }

        if (snapshotDetailStorage[start]) {
          data = await snapshotDetailStorage[start];
        } else {
          const ecgs = await getEcgData(start, start + duration * 1000);
          data = handleDataSnapshotDetail({ data: ecgs, duration });
          snapshotDetailStorage[start] = data;
        }

        setState({
          duration,
          range: tmp,
          data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [duration, start]);

  return (
    <div className="snapshot-chart">
      <div className="snapshot-chart__chart">
        {state?.data ? (
          <>
            <div
              className="chart-scroll"
              style={{ width: `${(state.duration * 75)}px` }}
            >
              <Chart
                dataI={state.data?.dataI}
                dataII={state.data?.dataII}
                dataIII={state.data?.dataIII}
              />
            </div>
            <div className="tickY">
              <span>I</span>
              <span>II</span>
              <span>III</span>
            </div>
          </>
        ) : (
          <div className="loading-donut">
            <LoadingDonut />
          </div>
        )}
      </div>
      <div className="snapshot-chart__range">
        <input
          type="range"
          id="range"
          min="0"
          max={state.duration}
          step="1"
          ref={inputRef}
          onChange={handleRange}
          onMouseOut={() => valueRef.current.style.setProperty('opacity', 0)}
          onBlur={() => {}}
          value={state.percent}
        />
        <span id="range-value" ref={valueRef}>
          {moment(state.percent * 1000).format('m:ss')}
        </span>

        <div className="list-tag-time">
          {_.map(state.range, (item, idx) => (
            <div
              className="tag-time"
              key={idx}
            >
              <div className="tag-time__point" />
              <span className="tag-time__time">
                {moment(item).format('m:ss')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SnapshotChart.defaultProps = {
  start: undefined,
  duration: undefined,
};

SnapshotChart.propTypes = {
  start: PropTypes.number,
  duration: PropTypes.number,
};


export default memo(SnapshotChart);
