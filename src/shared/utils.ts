import { HourDuration } from '@/shared/types/hourDuration';
import {
  getDayOfYear,
  secondsToHours,
  startOfMonth,
  startOfToday,
  startOfYear
} from 'date-fns';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { ActivityTotals } from '@/shared/ActivityTotals';
import { InternalSportType } from '@/components/components/hooks/types';

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

export const calculateActivityStreak = (
  activities: ActivitySummary[],
  filter?: (activities: ActivitySummary[]) => ActivitySummary[]
) => {
  const filterActivities = filter ? filter : (act: ActivitySummary[]) => act;

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
export const calculateMovingTime = (
  activities: ActivitySummary[],
  filter?: (activities: ActivitySummary[]) => ActivitySummary[]
): ActivityTotals => {
  const filterToApply = filter ? filter : (act: ActivitySummary[]) => act;

  const accumulator: ActivityTotals = {
    totalMovingTime: 0,
    totalCount: 0,
    sports: { unknown: { totalTimeSeconds: 0, count: 0 } }
  };

  return filterToApply(activities).reduce((runningTotal, currentActivity) => {
    const sportType: InternalSportType =
      currentActivity.sport_type ?? 'unknown';
    const movingTime = currentActivity.moving_time ?? 0;
    if (!runningTotal.sports[sportType]) {
      runningTotal.sports[sportType] = { count: 0, totalTimeSeconds: 0 };
    }

    runningTotal.sports[sportType].totalTimeSeconds += movingTime;
    runningTotal.sports[sportType].count++;
    runningTotal.totalCount++;
    runningTotal.totalMovingTime += movingTime;

    return runningTotal;
  }, accumulator);
};

const filterFromDate = (
  activities: ActivitySummary[],
  fromDate: Date
): ActivitySummary[] => {
  return activities.filter(activity => {
    return activity.start_date
      ? new Date(activity.start_date) > fromDate //BUG startOfMonthDate
      : false;
  });
};

export const fromToday = (activities: ActivitySummary[]): ActivitySummary[] =>
  filterFromDate(activities, startOfToday());

export const fromBeginningOfMonth = (
  activities: ActivitySummary[]
): ActivitySummary[] => filterFromDate(activities, startOfMonth(new Date()));

export const fromBeginningOfYear = (
  activities: ActivitySummary[]
): ActivitySummary[] => filterFromDate(activities, startOfYear(new Date()));
