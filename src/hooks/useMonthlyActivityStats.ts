import {
  calculateMovingTime,
  fromBeginningOfMonth,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';
import { getDaysInYear, hoursToSeconds } from 'date-fns';

const useMonthlyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult['month'] => {
  const daysInYear = getDaysInYear(today); // either 365 or 366
  const dayOfMonth = today.getDate();
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);

  const { totalMovingTime: totalMovingTimeSecondsForMonth } =
    calculateMovingTime(activityStats, fromBeginningOfMonth);
  const expectedSecondsForMonth = dayOfMonth * secondsPerDay;
  const timeAheadForMonth =
    totalMovingTimeSecondsForMonth - expectedSecondsForMonth;
  const averageDailySecondsForMonth =
    totalMovingTimeSecondsForMonth / dayOfMonth;
  const percentageAheadForMonth = Math.round(
    (timeAheadForMonth / expectedSecondsForMonth) * 100
  );

  return {
    totalMovingTime: time(totalMovingTimeSecondsForMonth),
    expectedTotal: time(expectedSecondsForMonth),
    timeAhead: time(timeAheadForMonth),
    averageDaily: time(averageDailySecondsForMonth),
    percentageAhead: percentageAheadForMonth
  };
};

export default useMonthlyActivityStats;
