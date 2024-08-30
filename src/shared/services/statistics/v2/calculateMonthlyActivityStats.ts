import { ActivityStatsResult } from '@/shared/services/statistics/types';
import { time } from '@/shared/types/time';
import { Activity } from '@/shared/types/Activity';
import { calculateCommon } from '@/shared/services/statistics/calculateCommon';
import { calculateMovingTime } from '@/shared/services/statistics/calculateMovingTime';
import { fromBeginningOfMonth } from '@/shared/utils';

const calculateMonthlyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: Activity.Row[]
): ActivityStatsResult['month'] => {
  const { dayOfMonth, secondsPerDay } = calculateCommon(targetGoalHours, today);

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

export default calculateMonthlyActivityStats;
