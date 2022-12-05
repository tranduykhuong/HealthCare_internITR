import { atom, selector } from 'recoil';
import auth from '../../../utils/auth';

export const Unit = atom({
  key: 'Unit',
  default: 'ft',
});


export const CmUnit = atom({
  key: 'CmUnit',
  default: auth.me()?.height || 0,
});

export const FtUnit = selector({
  key: 'FtUnit',
  get: ({ get }) => {
    const cm = get(CmUnit);
    return Math.floor(cm / 30.48);
  },

  set: ({ get, set }, value) => {
    const ft = get(CmUnit) / 30.48;
    const In = (ft - parseInt(ft, 10)) * 12;
    set(
      CmUnit,
      Math.round((+value?.target?.value || 0) * 30.48 + In * 2.54),
    );
  },
});

export const InUnit = selector({
  key: 'InUnit',
  get: ({ get }) => {
    const cm = get(CmUnit);
    return Math.round((cm / 30.48 - parseInt(cm / 30.48, 10)) * 12 || 0);
  },

  set: ({ get, set }, value) => {
    const ft = Math.floor(get(CmUnit) / 30.48);
    set(
      CmUnit,
      Math.round((+value?.target?.value || 0) * 2.54 + ft * 30.48),
    );
  },
});


export const KgUnit = atom({
  key: 'KgUnit',
  default: auth.me()?.weight || 0,
});

export const LbsUnit = selector({
  key: 'LbsUnit',
  get: ({ get }) => get(KgUnit) * 2.20462,

  set: ({ set }, value) => {
    set(
      KgUnit,
      +value?.target?.value / 2.20462,
    );
  },
});


export const dataRecoil = atom({
  key: 'dataRecoil',
  default: {
    firstName: auth.me()?.firstName || '',
    lastName: auth.me()?.lastName || '',
    gender: auth.me()?.gender || 'Male',
    height: auth.me()?.height || '',
    weight: auth.me()?.weight || '',
    dob: auth.me()?.dateOfBirth ? auth.me()?.dateOfBirth.substring(0, 10) : '',
    email: auth.me()?.email || 'aghtr245@example.com',
  },
});

export const errorsRecoil = atom({
  key: 'errorsRecoil',
  default: {},
});

export const isSaveRecoil = atom({
  key: 'isSaveRecoil',
  default: false,
});

export const avatarUrlRecoil = atom({
  key: 'avatarUrlRecoil',
  default: { url: auth.me()?.avatar },
});
