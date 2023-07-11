import { ActivityStatsResult } from '@/components/components/hooks/types';
import { time } from '@/shared/types/time';
import calculateCommon from '@/components/components/hooks/utils/calculateCommon';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { calculateMovingTime, fromBeginningOfMonth } from '@/shared/utils';

const calculateMonthlyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: ActivitySummary[]
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
