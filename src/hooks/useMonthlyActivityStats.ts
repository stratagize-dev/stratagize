import {
  calculateMovingTime,
  fromBeginningOfMonth,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';
import useCommon from '@/hooks/useCommon';

const useMonthlyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult['month'] => {
  const { dayOfMonth, secondsPerDay } = useCommon(targetGoalHours, today);

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
