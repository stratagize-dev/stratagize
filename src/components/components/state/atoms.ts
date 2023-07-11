import { atomWithStorage } from 'jotai/utils';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { atomWithLocalStorage } from '@/shared/atomWithLocalStorage';

export const annualHourGoalAtom = atomWithStorage('annualHourGoalAtom', 365);

export const activitiesAtom = atomWithStorage<ActivitySummary[]>(
  'activitySummary',
  []
);

export const lastActivityDateAtom = atomWithStorage<string | undefined>(
  'lastActivityDateAtom',
  undefined
);

// const defaultStorage: Storage<unknown> = {
//   getItem: (key) => {
//     const storedValue = localStorage.getItem(key)
//     if (storedValue === null) {
//       throw new Error('no value stored')
//     }
//     return JSON.parse(storedValue)
//   },
//   setItem: (key, newValue) => {
//     localStorage.setItem(key, JSON.stringify(newValue))
//   },
// }
