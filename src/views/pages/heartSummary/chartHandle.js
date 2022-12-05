import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import fetchHeartRates from '../../../services/apollo/functions/fetchHeartRates';
import {
  dataHrRecoil, getTimeRecoil, typeRateRecoil, typeTimeRecoil,
} from './recoil';
import { BubbleChart, LineChart } from '../../components/chartCT';
import { LoadingDonut } from '../../components/loading';
import { calcAvgMinMax, formatTime, handleConfigChart } from './handler';
import { HR_SUMMARY_CONSTANTS } from '../../../constants';
import auth from '../../../utils/auth';

const ChartHandle = () => {
  const [data, setData] = useRecoilState(dataHrRecoil);
  const activityType = useRecoilValue(typeRateRecoil);
  const type = useRecoilValue(typeTimeRecoil);
  const { fromTime, endTime, interval } = useRecoilValue(getTimeRecoil);
  const time = formatTime();
  const dataChart = handleConfigChart();
  const { minValue, maxValue, avgValue } = calcAvgMinMax();

  useEffect(async () => {
    const filter = {
      fromTime,
      endTime,
      activityType,
      type,
      interval,
      utcOffset: auth.me()?.utcOffset,
    };

    try {
      const fetchData = await fetchHeartRates(filter);
      setData(fetchData);
    } catch (err) {
      console.log(err);
    }

    return filter;
  }, [fromTime, endTime, activityType]);

  return (
    <div>
      <div className="chart">
        {data ? (
          <div className="chart__card">
            {type === 'Hour'
              ? (
                <BubbleChart
                  datasets={dataChart?.datasets}
                  xAxis={dataChart?.xAxis}
                  yAxis={dataChart?.yAxis}
                />
              )
              : (
                <LineChart
                  datasets={dataChart?.datasets}
                  tension={dataChart?.tension}
                  point={dataChart?.point}
                  xAxis={dataChart?.xAxis}
                  yAxis={dataChart?.yAxis}
                />
              )}
          </div>
        ) : (
          <div className="chart__loading">
            <LoadingDonut medium />
          </div>
        )}
      </div>

      {activityType === HR_SUMMARY_CONSTANTS.ALL
        ? (
          <div className="rate1">
            <div className="rate1__item">
              <h3>Min rate</h3>
              <p>{minValue}</p>
            </div>
            <div className="rate1__item">
              <h3>AVG rate</h3>
              <p className="item-center">{avgValue}</p>
            </div>
            <div className="rate1__item">
              <h3>Max rate</h3>
              <p>{maxValue}</p>
            </div>
          </div>
        )
        : (
          <div className="rate2">
            <div className="rate2__time">
              {time}
            </div>
            <div className="rate2__avg">
              <h4>Average</h4>
              <p>{avgValue}</p>
              <span>ms</span>
            </div>
          </div>
        )
      }
    </div>
  );
};


ChartHandle.propTypes = {

};


export default ChartHandle;
