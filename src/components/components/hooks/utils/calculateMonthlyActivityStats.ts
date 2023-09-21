import { ActivityStatsResult } from '@/components/components/hooks/types';
import { time } from '@/shared/types/time';
import calculateCommon from '@/components/components/hooks/utils/calculateCommon';
import { calculateMovingTime, fromBeginningOfMonth } from '@/shared/utils';
import * as StravaApi from '@/shared/strava-client';

const calculateMonthlyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: StravaApi.SummaryActivity[]
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
