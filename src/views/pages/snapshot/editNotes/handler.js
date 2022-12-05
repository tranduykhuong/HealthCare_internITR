import * as _ from 'lodash';

export const handleInitTagList = (tmp, tagsSelected) => {
  _.forEach(tagsSelected, (item) => {
    let idx = _.findIndex(tmp.symptoms, e => e.tag === item, 0);
    if (idx !== -1) tmp.symptoms[idx].selected = true;
    idx = _.findIndex(tmp.activitiesDiet, e => e.tag === item, 0);
    if (idx !== -1) tmp.activitiesDiet[idx].selected = true;
    idx = _.findIndex(tmp.mood, e => e.tag === item, 0);
    if (idx !== -1) tmp.mood[idx].selected = true;
  });
};

export const handleUnselectedTagList = (tmp, item) => {
  _.forEach(tmp.symptoms, (e) => {
    if (item === e?.tag) {
      e.selected = false;
    }
  });
  _.forEach(tmp.activitiesDiet, (e) => {
    if (item === e?.tag) {
      e.selected = false;
    }
  });
  _.forEach(tmp.mood, (e) => {
    if (item === e?.tag) {
      e.selected = false;
    }
  });
};
