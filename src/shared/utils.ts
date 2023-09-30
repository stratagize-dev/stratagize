import { HourDuration } from '@/shared/types/hourDuration';
import {
  getDayOfYear,
  secondsToHours,
  startOfMonth,
  startOfToday,
  startOfYear
} from 'date-fns';
import { ActivityTotals } from '@/shared/ActivityTotals';
import * as StravaApi from '@/shared/strava-client';
import { Activity, convertSportType, SportType } from '@/shared/types/Activity';
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

/**
 * @deprecated
 * @param activities
 * @param filter
 */
export const calculateActivityStreak = (
  activities: StravaApi.SummaryActivity[],
  filter?: (
    activities: StravaApi.SummaryActivity[]
  ) => StravaApi.SummaryActivity[]
) => {
  const filterActivities = filter
    ? filter
    : (act: StravaApi.SummaryActivity[]) => act;

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDay = 0;
  let currentStreakStartDate: Date | undefined = undefined;
  let maxStreakStartDate: Date | undefined = undefined;
  let activeDayCount = 0;
  filterActivities(activities).forEach(summaryActivity => {
    if (!summaryActivity.start_date) {
      return;
    }
    const activityDate = new Date(summaryActivity.start_date);
    const activityDay = getDayOfYear(activityDate);

    if (activityDay === previousDay) return; // multiple activities for the same day

    activeDayCount++;

    if (activityDay - previousDay === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
      currentStreakStartDate = activityDate;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxStreakStartDate = currentStreakStartDate;
    }
    previousDay = activityDay;
  });

  return {
    activeDayCount,
    maxStreak,
    maxStreakStartDate,
    currentStreak,
    currentStreakStartDate
  };
};
/**
 * @deprecated
 * @param activities
 * @param filter
 */
export const calculateMovingTime = (
  activities: StravaApi.SummaryActivity[],
  filter?: (
    activities: StravaApi.SummaryActivity[]
  ) => StravaApi.SummaryActivity[]
): ActivityTotals => {
  const filterToApply = filter
    ? filter
    : (act: StravaApi.SummaryActivity[]) => act;

  const accumulator: ActivityTotals = {
    totalMovingTime: 0,
    totalCount: 0,
    sports: { Unknown: { totalTimeSeconds: 0, count: 0 } }
  };

  return filterToApply(activities).reduce((runningTotal, currentActivity) => {
    const sportType: SportType = convertSportType(currentActivity.sport_type);
    const movingTime = currentActivity.moving_time ?? 0;

    let total = runningTotal.sports[sportType];

    if (total === undefined) {
      total = { count: 0, totalTimeSeconds: 0 };
    }

    total.totalTimeSeconds += movingTime;
    total.count++;

    runningTotal.sports[sportType] = total;
    runningTotal.totalCount++;
    runningTotal.totalMovingTime += movingTime;

    return runningTotal;
  }, accumulator);
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
