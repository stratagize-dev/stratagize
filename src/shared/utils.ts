import { HourDuration } from '@/shared/types/hourDuration';
import {
  secondsToHours,
  startOfMonth,
  startOfToday,
  startOfYear
} from 'date-fns';
import * as StravaApi from '@/shared/strava-client';
import { Activity } from '@/shared/types/Activity';
export const secondsToHourDuration = (totalSeconds: number): HourDuration => {
  const absoluteSeconds = Math.abs(totalSeconds);
  const hours = Math.floor(secondsToHours(absoluteSeconds));
  const minutes = Math.floor((absoluteSeconds % 3600) / 60);
  const seconds = absoluteSeconds % 60;

  return {
    isAhead: totalSeconds >= 0,
    hours,
    minutes,
    seconds
  };
};

const filterFromDate = <T extends StravaApi.SummaryActivity | Activity.Row>(
  activities: T[],
  fromDate: Date
): T[] => {
  return activities.filter(activity => {
    return activity.start_date
      ? new Date(activity.start_date) > fromDate //BUG startOfMonthDate
      : false;
  });
};

export const fromToday = <T extends StravaApi.SummaryActivity | Activity.Row>(
  activities: T[]
): T[] => filterFromDate(activities, startOfToday());

export const fromBeginningOfMonth = <
  T extends StravaApi.SummaryActivity | Activity.Row
>(
  activities: T[]
): T[] => filterFromDate(activities, startOfMonth(new Date()));

export const fromBeginningOfYear = <
  T extends StravaApi.SummaryActivity | Activity.Row
>(
  activities: T[]
): T[] => filterFromDate(activities, startOfYear(new Date()));
