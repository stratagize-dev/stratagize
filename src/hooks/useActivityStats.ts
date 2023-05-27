import {
  calculateMovingTime,
  fromBeginningOfMonth,
  fromToday,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { getDayOfYear, getDaysInYear, hoursToSeconds } from 'date-fns';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';

const useActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult => {
  const daysInYear = getDaysInYear(today); // either 365 or 366
  const dayOfYear = getDayOfYear(today); // e.g. 52nd day of year
  const daysRemaining = daysInYear - dayOfYear;
  const dayOfMonth = today.getDate();
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);

  // Yearly calculations
  const totalMovingTimeSeconds = calculateMovingTime(activityStats);
  const expectedSecondsPerDay = dayOfYear * secondsPerDay;
  const timeAheadForYear = totalMovingTimeSeconds - expectedSecondsPerDay;
  const percentageAhead = Math.round(
    (timeAheadForYear / expectedSecondsPerDay) * 100
  );

  const percentageComplete = Math.round(
    (totalMovingTimeSeconds / hoursToSeconds(targetGoalHours)) * 100
  );
  const averageDailySeconds = totalMovingTimeSeconds / dayOfYear;
  const projectedTotal = averageDailySeconds * daysInYear;

  const secondsPerDayToComplete =
    (targetGoalSeconds - totalMovingTimeSeconds) / daysRemaining;

  /**
   * Current Month calculations
   */
  const totalMovingTimeSecondsForMonth = calculateMovingTime(
    activityStats,
    fromBeginningOfMonth
  );
  const expectedSecondsForMonth = dayOfMonth * secondsPerDay;
  const timeAheadForMonth =
    totalMovingTimeSecondsForMonth - expectedSecondsForMonth;
  const averageDailySecondsForMonth =
    totalMovingTimeSecondsForMonth / dayOfMonth;
  const percentageAheadForMonth = Math.round(
    (timeAheadForMonth / expectedSecondsForMonth) * 100
  );

  /**
   * Current Day calculations
   */
  const totalMovingTimeSecondsForDay = calculateMovingTime(
    activityStats,
    fromToday
  );
  const timeAheadForDay = totalMovingTimeSecondsForDay - secondsPerDay;
  const percentageAheadForDay = Math.round(
    (timeAheadForDay / secondsPerDay) * 100
  );

  return {
    requiredActivityPerDay: time(secondsPerDay),
    secondsPerDayToComplete: time(secondsPerDayToComplete),
    year: {
      totalMovingTime: time(totalMovingTimeSeconds),
      expectedTotal: time(expectedSecondsPerDay),
      timeAhead: time(timeAheadForYear),
      actualDailyAverage: time(averageDailySeconds),
      projectedTotal: time(projectedTotal),
      percentageComplete,
      percentageAhead
    },
    month: {
      totalMovingTime: time(totalMovingTimeSecondsForMonth),
      expectedTotal: time(expectedSecondsForMonth),
      timeAhead: time(timeAheadForMonth),
      averageDaily: time(averageDailySecondsForMonth),
      percentageAhead: percentageAheadForMonth
    },
    day: {
      totalMovingTime: time(totalMovingTimeSecondsForDay),
      timeAhead: time(timeAheadForDay),
      percentageAhead: percentageAheadForDay
    }
  };
};

export default useActivityStats;
