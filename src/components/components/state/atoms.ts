import { atomWithStorage } from 'jotai/utils';
import { SummaryActivity } from '@/shared/strava-client';
export const annualHourGoalAtom = atomWithStorage('annualHourGoalAtom', 365);

export const activitiesAtom = atomWithStorage<SummaryActivity[]>(
  'activitySummary',
  []
);

export const lastActivityDateAtom = atomWithStorage<string | undefined>(
  'lastActivityDateAtom',
  undefined
);
