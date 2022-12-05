import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

import fetchEcgBackups from '../../../../../services/apollo/functions/fetchEcgBackups';
import { handleCookies } from '../../handler';

const downloadSelectedEcgData = async (ranges, cookies) => {
  if (ranges.length) {
    const promises = [];
    const { policy, keyPairId, signature } = handleCookies(cookies);


    _.forEach(ranges, (range) => {
      promises.push(
        axios.get(`${range.url}?Policy=${policy}&Key-Pair-Id=${keyPairId}&Signature=${signature}`, {
          responseType: 'arraybuffer',
          headers: {
            Range: `bytes=${range.dataRange.start}-${range.dataRange.stop}`,
            // Cookie: cookies.join(';'),
          },
        }),
      );
    });

    const response = await Promise.all(promises);
    const selectedEcgData = _.map(response, x => new Int16Array(x.data));

    return new Int16Array(
      selectedEcgData.reduce((acc, curr) => [...acc, ...curr], []),
    );
  }

  return [];
};

// The range start-stop time of data chunks must be sort by ASC
const addDataRanges = ({
  summaries,
  start,
  stop,
  samplingFrequency,
  channels,
}) => {
  let currentLastMoment = moment(start);
  const stopMoment = moment(stop);
  const channelLength = channels.length;
  const samplePerSecond = channelLength * 2 * samplingFrequency;

  const clonedSummaries = _.cloneDeep(summaries);

  for (let i = 0; i < clonedSummaries.length; i += 1) {
    const hourlySummary = clonedSummaries[i];
    const currentStartMoment = moment(hourlySummary.start);
    const currentStopMoment = moment(hourlySummary.stop);
    const startDiff = currentLastMoment.diff(currentStartMoment, 's');
    const stopDiff = stopMoment.diff(currentStopMoment, 's');
    const startSampleIdx = startDiff >= 0 ? startDiff * samplePerSecond : 0;
    const currentStart = startDiff >= 0 ? currentLastMoment : currentStartMoment;
    let stopSampleIdx = startSampleIdx;

    if (stopDiff >= 0) {
      stopSampleIdx
        += currentStopMoment.diff(currentStart, 's') * samplePerSecond - 1;
    } else {
      stopSampleIdx += stopMoment.diff(currentStart, 's') * samplePerSecond - 1;
    }

    currentLastMoment = currentStopMoment;
    hourlySummary.dataRange = {
      start: startSampleIdx,
      stop: stopSampleIdx,
    };
  }

  return clonedSummaries;
};

const filterHourlySummaryRanges = ({
  summaries,
  start,
  stop,
  samplingFrequency,
  channels,
  willAddDataRanges,
}) => {
  const startEpoch = start.valueOf();
  const stopEpoch = stop.valueOf();
  const ranges = _.filter(summaries, (x) => {
    const itemStartEpoch = moment(x.start).valueOf();
    const itemStopEpoch = moment(x.stop).valueOf();

    return startEpoch <= itemStopEpoch && stopEpoch >= itemStartEpoch;
  });

  if (willAddDataRanges) {
    return addDataRanges({
      summaries: ranges,
      start,
      stop,
      samplingFrequency,
      channels,
    });
  }

  return ranges;
};

const convertBinaryToECGData = (totalChannel, binaryData) => {
  if (binaryData) {
    const ecgData = new Array(totalChannel);

    for (let i = 0; i < binaryData.length; i += totalChannel) {
      for (let j = 0; j < totalChannel; j += 1) {
        if (ecgData[j]) {
          ecgData[j].push(binaryData[i + j]);
        } else {
          ecgData[j] = [binaryData[i + j]];
        }
      }
    }

    return ecgData;
  }

  return undefined;
};

const getSineWaveDataArray = (diffSeconds, samplingFrequency, adcGain) => {
  const halfSamplingFrequency = samplingFrequency / 2;

  const missingSampleLength = diffSeconds * samplingFrequency;
  const sineWaveCount = Math.floor(missingSampleLength / samplingFrequency);

  const sineWaveDataArray = _.map(
    _.range(samplingFrequency),
    x => Math.sin(x * ((2 * Math.PI) / samplingFrequency))
      * (0.75 * (adcGain / 2)),
  );

  // *: Create positive & negative sinewave with translating y-offset by 0.75 * adcGain (1.5 square)
  const positiveSineWaveDataArray = _.map(
    sineWaveDataArray.slice(0, halfSamplingFrequency),
    x => Math.round(x - 1.25 * adcGain),
  );
  const negativeSineWaveDataArray = _.map(
    sineWaveDataArray.slice(halfSamplingFrequency, sineWaveDataArray.length),
    x => Math.round(x + 1.25 * adcGain),
  );

  return { sineWaveCount, positiveSineWaveDataArray, negativeSineWaveDataArray };
};

const addSineWaveToEcgData = (
  selectedEcgData,
  ecgDataMap,
  ranges,
  startMoment,
  stopMoment,
) => {
  const { samplingFrequency, gain } = ecgDataMap[0];

  const oneChannelsSize = (stopMoment.valueOf() / 1000 - startMoment.valueOf() / 1000)
    * samplingFrequency;

  // console.log('lengh channels 1', selectedEcgData[0].length, oneChannelsSize);
  if (selectedEcgData[0].length === oneChannelsSize) {
    console.log('Enough ECG data', selectedEcgData[0].length, oneChannelsSize);

    // *: Enough ECG data
    return selectedEcgData;
  }

  const ecgData = [];

  for (let j = 0; j < selectedEcgData.length; j += 1) {
    let pushECGData = [];

    for (let i = 0; i < ranges.length; i += 1) {
      const currentStartMoment = moment(ranges[i].start);
      const currentStopMoment = moment(ranges[i].stop);

      if (!ranges[i - 1]) {
        // *: First
        const preDiffSeconds = currentStartMoment.diff(startMoment, 'seconds');

        if (preDiffSeconds > 0) {
          // *: Missing pre data
          const {
            sineWaveCount,
            positiveSineWaveDataArray,
            negativeSineWaveDataArray,
          } = getSineWaveDataArray(preDiffSeconds, samplingFrequency, gain);

          // *: Each sineWaveCount has couple of positive & negative sinewave

          for (let k = 0; k < sineWaveCount; k += 1) {
            pushECGData = pushECGData.concat(positiveSineWaveDataArray);
            pushECGData = pushECGData.concat(negativeSineWaveDataArray);
          }
        }

        pushECGData = pushECGData.concat(selectedEcgData[j]);

        if (ranges.length === 1) {
          // *: Only 1 range
          const postDiffSeconds = stopMoment.diff(currentStopMoment, 'seconds');

          if (postDiffSeconds > 0) {
            // *: Missing post data
            const {
              sineWaveCount,
              positiveSineWaveDataArray,
              negativeSineWaveDataArray,
            } = getSineWaveDataArray(postDiffSeconds, samplingFrequency, gain);

            for (let k = 0; k < sineWaveCount; k += 1) {
              pushECGData = pushECGData.concat(positiveSineWaveDataArray);
              pushECGData = pushECGData.concat(negativeSineWaveDataArray);
            }
          }
        }
      } else {
        // *: Other
        const previousStopMoment = moment(ranges[i - 1].stop);

        const preDiffSeconds = currentStartMoment.diff(
          previousStopMoment,
          'seconds',
        );

        if (preDiffSeconds > 0) {
          // *: Missing pre data
          const {
            sineWaveCount,
            positiveSineWaveDataArray,
            negativeSineWaveDataArray,
          } = getSineWaveDataArray(preDiffSeconds, samplingFrequency, gain);

          for (let k = 0; k < sineWaveCount; k += 1) {
            pushECGData = pushECGData.concat(positiveSineWaveDataArray);
            pushECGData = pushECGData.concat(negativeSineWaveDataArray);
          }
        }

        pushECGData = pushECGData.concat(selectedEcgData[j]);

        if (!ranges[i + 1]) {
          // *: Last
          const postDiffSeconds = stopMoment.diff(currentStopMoment, 'seconds');

          if (postDiffSeconds > 0) {
            // *: Missing post data
            const {
              sineWaveCount,
              positiveSineWaveDataArray,
              negativeSineWaveDataArray,
            } = getSineWaveDataArray(postDiffSeconds, samplingFrequency, gain);

            for (let k = 0; k < sineWaveCount; k += 1) {
              pushECGData = pushECGData.concat(positiveSineWaveDataArray);
              pushECGData = pushECGData.concat(negativeSineWaveDataArray);
            }
          }
        }
      }
    }

    ecgData.push(pushECGData);
  }

  return ecgData;
};

const getEcgMap = async (start, stop) => {
  const ecgDataMap = await fetchEcgBackups(
    {
      start,
      stop,
    },
    'asc',
  );

  if (ecgDataMap?.error) {
    throw Error(ecgDataMap.error);
  }

  if (ecgDataMap.ecgBackups?.length === 0) {
    throw Error('Empty');
  }

  const inactiveEcgs = _.filter(ecgDataMap.ecgBackups, data => data.status === 'Inactive');

  if (inactiveEcgs.length > 0) {
    throw Error('Inactive');
  }

  return ecgDataMap;
};

const scaleDataWithGain = (ecgData, gain, channels) => {
  const finalData = [];

  if (ecgData?.length !== channels.length) {
    return finalData;
  }

  for (let i = 0; i < channels.length; i += 1) {
    finalData.push(
      _.map(ecgData[i], x => x / gain),
    );
  }

  return finalData;
};

const getEcgData = async (start, stop) => {
  const data = await getEcgMap(start, stop);

  const { cookies } = data;
  let { ecgBackups } = data;

  if (ecgBackups.length === 2 && ecgBackups[0].start >= ecgBackups[1].stop) {
    ecgBackups = [ecgBackups[1], ecgBackups[0]];
  }

  const { channels, samplingFrequency, gain } = ecgBackups[0];

  const startMoment = moment(start);
  const stopMoment = moment(stop);

  const ranges = filterHourlySummaryRanges({
    summaries: ecgBackups,
    start: startMoment,
    stop: stopMoment,
    channels,
    samplingFrequency,
    willAddDataRanges: true,
  });

  // console.log('ranges', ranges);

  const downloadedSelectedEcgData = await downloadSelectedEcgData(
    ranges,
    cookies,
  );
  // console.log('ranges', downloadedSelectedEcgData.length);
  const selectedEcgData = convertBinaryToECGData(
    channels.length,
    downloadedSelectedEcgData,
  );

  const ecgData = addSineWaveToEcgData(
    selectedEcgData,
    ecgBackups,
    ranges,
    startMoment,
    stopMoment,
  );
  const dataECG = scaleDataWithGain(ecgData, gain === 0 ? 1 : gain, channels);

  return {
    dataECG,
    samplingFrequency,
  };
};

export default getEcgData;
