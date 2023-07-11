import { atomWithStorage } from 'jotai/utils';
import { ActivitySummary } from '@/shared/types/ActivitySummary';

export const annualHourGoalAtom = atomWithStorage('annualHourGoalAtom', 365);

export const activitiesAtom = atomWithStorage<ActivitySummary[]>(
  'activitySummary',
  []
);

export const lastActivityDateAtom = atomWithStorage<string | undefined>(
  'lastActivityDateAtom',
  undefined
);
