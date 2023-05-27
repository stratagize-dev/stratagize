import { atomWithStorage } from 'jotai/utils';

export const annualHourGoalAtom = atomWithStorage('annualHourGoalAtom', 365);
export const annualMovingTimeSecondsAtom = atomWithStorage<number | undefined>(
  'annualMovingTimeSecondsAtom',
  undefined
);
