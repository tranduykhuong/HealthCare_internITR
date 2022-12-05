import { useSetRecoilState } from 'recoil';
import * as _ from 'lodash';
import {
  cookiesRecoil, cursorRecoil, snapshotsListRecoil,
} from './recoil';

export const handleSnapshotList = (data) => {
  const setCursor = useSetRecoilState(cursorRecoil);
  const setCookies = useSetRecoilState(cookiesRecoil);
  const setSnapshotList = useSetRecoilState(snapshotsListRecoil);

  setSnapshotList(data.snapshots);
  setCursor(data.cursor);
  setCookies({
    policy: _.split(_.split(data.cookies[0], '=')[1], ';')[0],
    keyPairId: _.split(_.split(data.cookies[1], '=')[1], ';')[0],
    signature: _.split(_.split(data.cookies[2], '=')[1], ';')[0],
  });
};

export const handleCookies = cookies => ({
  policy: _.split(_.split(cookies[0], '=')[1], ';')[0],
  keyPairId: _.split(_.split(cookies[1], '=')[1], ';')[0],
  signature: _.split(_.split(cookies[2], '=')[1], ';')[0],
});

export const TAGS_GROUP = {
  symptoms: [
    { tag: 'Can’t sleep', selected: false },
    { tag: 'Chest discomfort', selected: false },
    { tag: 'Chest pain', selected: false },
    { tag: 'Cough', selected: false },
    { tag: 'Dizziness', selected: false },
    { tag: 'Fatigue', selected: false },
    { tag: 'Fever', selected: false },
    { tag: 'Headache', selected: false },
    { tag: 'Lightheadedness', selected: false },
    { tag: 'Nausea', selected: false },
    { tag: 'Numbness in arm(s) or leg(s)', selected: false },
    { tag: 'Palpitations', selected: false },
    { tag: 'Poor appetite', selected: false },
    { tag: 'Shortness of breath', selected: false },
    { tag: 'Sore throat', selected: false },
    { tag: 'Sweating', selected: false },
  ],
  activitiesDiet: [
    { tag: 'Alcohol', selected: false },
    { tag: 'Caffeine', selected: false },
    { tag: 'Cycling', selected: false },
    { tag: 'Exercised', selected: false },
    { tag: 'Running', selected: false },
    { tag: 'Swimming', selected: false },
    { tag: 'Walking', selected: false },
    { tag: 'Woke up', selected: false },
  ],
  mood: [
    { tag: 'Anxiety', selected: false },
    { tag: 'Relaxed', selected: false },
    { tag: 'Slept poorly', selected: false },
    { tag: 'Slept well', selected: false },
    { tag: 'Stressed', selected: false },
  ],
};

export const TAGS = [
  { tag: 'Can’t sleep', selected: false },
  { tag: 'Chest discomfort', selected: false },
  { tag: 'Chest pain', selected: false },
  { tag: 'Cough', selected: false },
  { tag: 'Dizziness', selected: false },
  { tag: 'Fatigue', selected: false },
  { tag: 'Fever', selected: false },
  { tag: 'Headache', selected: false },
  { tag: 'Lightheadedness', selected: false },
  { tag: 'Nausea', selected: false },
  { tag: 'Numbness in arm(s) or leg(s)', selected: false },
  { tag: 'Palpitations', selected: false },
  { tag: 'Poor appetite', selected: false },
  { tag: 'Shortness of breath', selected: false },
  { tag: 'Sore throat', selected: false },
  { tag: 'Sweating', selected: false },
  { tag: 'Alcohol', selected: false },
  { tag: 'Caffeine', selected: false },
  { tag: 'Cycling', selected: false },
  { tag: 'Exercised', selected: false },
  { tag: 'Running', selected: false },
  { tag: 'Swimming', selected: false },
  { tag: 'Walking', selected: false },
  { tag: 'Woke up', selected: false },
  { tag: 'Anxiety', selected: false },
  { tag: 'Relaxed', selected: false },
  { tag: 'Slept poorly', selected: false },
  { tag: 'Slept well', selected: false },
  { tag: 'Stressed', selected: false },
];
