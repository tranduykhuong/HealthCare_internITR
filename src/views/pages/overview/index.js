import React, { useEffect, useState } from 'react';
import './styles.scss';
import cx from 'classnames';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Card from './cardInfo';
import useMergeState from '../../../utils/hooks/useMergeState';
import {
  iconHealthActive,
  iconHeartCard,
  iconLeaveCard,
  iconSnapshotActive,
} from '../../../assets/images/svg';
import CardChart from './cardChart';
import { Loading } from '../../components/loading';
import overviewData from '../../../redux/actions/overviewData';
import auth from '../../../utils/auth';
import { BarChart, LineChart } from '../../components/chartCT';
import { generateDataChart } from '../../components/chartCT/handler';

const configChart = {
  datasets: {
    dataAvgs: [], dataMins: [], dataMaxs: [],
  },
  xAxis: {
    xMin: 0,
    xMax: 1000,
    type: 'time',
    time: {
      stepSize: '4',
      unit: 'hour',
    },
  },
  yAxis: {
    yMin: 0, yMax: 10,
  },
};

const filter = {
  fromTime: 0,
  endTime: 0,
  activityType: 'All',
  type: 'Day',
  interval: '30m',
  utcOffset: auth.me()?.utcOffset,
};

const Overview = () => {
  const dispatch = useDispatch();
  const dataOverview = useSelector(state => state.overviewData);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useMergeState({
    hrv: '-',
    resting: '-',
    standing: '-',
    activityHR: '-',
    activityMinutes: '-',

    heartRates: configChart,
    activity: {},
  });

  useEffect(async () => {
    if (dataOverview?.finished) {
      const {
        dataAvgs, dataMins, dataMaxs, yMin, yMax,
      } = generateDataChart(dataOverview?.heartRates, 'Day');

      setData({
        hrv: dataOverview?.AVG?.hrv.toString(),
        resting: dataOverview?.AVG?.resting.toString(),
        standing: dataOverview?.AVG?.standing.toString(),
        activityHR: dataOverview?.AVG?.activityHR.toString(),
        activityMinutes: dataOverview?.AVG?.activityMinutes.toString(),

        heartRates: {
          datasets: {
            dataAvgs, dataMins, dataMaxs,
          },
          xAxis: {
            xMin: dataOverview?.heartRates?.fromTime,
            xMax: dataOverview?.heartRates?.endTime,
            type: 'time',
            time: {
              stepSize: '4',
              unit: 'hour',
            },
          },
          yAxis: {
            yMin, yMax,
          },
        },
        activity: dataOverview?.activity,
      });
      setLoading(false);
    } else if (auth.isLoginSuccess()) {
      try {
        setLoading(true);
        await dispatch(overviewData(filter));
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  }, [dataOverview]);

  return (
    <>
      {loading && <Loading />}

      <div className="overview">
        <div className="overview__heading">
          <h2>Overview</h2>
          <p>{moment().format('MMMM Do YYYY')}</p>
        </div>

        <div className="overview__content">
          <div className="row">
            <div className="col col-3">
              <Card
                title="Heart Rate"
                value={dataOverview?.heartRates?.avgs ? dataOverview?.heartRates?.avgs[0]?.value.toString() : '-'}
                unit="bpm"
                icon={iconHeartCard}
              />
            </div>
            <div className="col col-9">
              <CardChart
                title="Heart Rate Chart"
                status={moment(dataOverview?.heartRates?.fromTime).format('MMM DD')}
                chart={(
                  <LineChart
                    datasets={data?.heartRates?.datasets}
                    tension="0.4"
                    xAxis={data?.heartRates?.xAxis}
                    yAxis={data?.heartRates?.yAxis}
                    point={{
                      lastPoint: true,
                      pointBorderWidth: '0',
                      pointBackgroundColor: 'rgba(220,220,220,0)',
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-3">
              <Card
                title="HR Variability"
                value={data.hrv}
                unit="ms"
                icon={iconHeartCard}
              />
            </div>
            <div className="col col-3">
              <Card
                title="Standing HR"
                value={data.standing}
                unit="bpm"
                icon={iconHeartCard}
              />
            </div>
            <div className="col col-3">
              <Card
                title="Resting HR"
                value={data.resting}
                unit="bpm"
                icon={iconHeartCard}
              />
            </div>
            <div className="col col-3">
              <Card
                title="HR during activity"
                value={data.activityHR}
                unit="bpm"
                icon={iconHeartCard}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-3">
              <Card
                title="Active minute"
                value={data.activityMinutes}
                unit="mins"
                icon={iconLeaveCard}
              />
            </div>
            <div className="col col-9">
              <CardChart
                title="Activity chart"
                status={moment(data.activity?.fromTime).format('MMM DD')}
                chart={<BarChart data={data.activity} />}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-6">
              <CardChart
                icon={iconHealthActive}
                title="Health Report"
                status="Recent"
                time="Dec 31, 2021 - Jan 6, 2022"
              />
            </div>
            <div className="col col-6">
              <CardChart
                icon={iconSnapshotActive}
                title="Snapshot"
                status="Recent"
                time="Nov 8, 12:00:00 AM - 1 min"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
