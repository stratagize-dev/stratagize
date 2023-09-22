import { atomWithStorage } from 'jotai/utils';
import { SummaryActivity } from '@/shared/strava-client';
import { atom } from 'jotai';

export const annualHourGoalAtom = atom(100);

export const activitiesAtom = atomWithStorage<SummaryActivity[]>(
  'activitySummary',
  []
);

export const lastActivityDateAtom = atomWithStorage<string | undefined>(
  'lastActivityDateAtom',
  undefined
);
