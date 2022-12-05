import { atom } from 'recoil';

export const cookiesRecoil = atom({
  key: 'cookiesRecoil',
  default: {
    policy: '',
    keyPairId: '',
    signature: '',
  },
});

export const cursorRecoil = atom({
  key: 'cursorRecoil',
  default: undefined,
});

export const snapshotsListRecoil = atom({
  key: 'snapshotsListRecoil',
  default: undefined,
});

export const currentSnapshotRecoil = atom({
  key: 'currentSnapshotRecoil',
  default: undefined,
});

export const typeRecoil = atom({
  key: 'typeRecoil',
  default: 'recent',
});

export const filterRecoil = atom({
  key: 'filterRecoil',
  default: undefined,
});
