import { ActivityStatsResult } from '@/components/components/hooks/types';
import { time } from '@/shared/types/time';
import calculateCommon from '@/components/components/hooks/utils/calculateCommon';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { calculateMovingTime, fromToday } from '@/shared/utils';

const calculateDailyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: ActivitySummary[]
): ActivityStatsResult['day'] => {
  const { totalMovingTime: totalMovingTimeSecondsForDay } = calculateMovingTime(
    activityStats,
    fromToday
  );

  const { secondsPerDay } = calculateCommon(targetGoalHours, today);

  const timeAheadForDay = totalMovingTimeSecondsForDay - secondsPerDay;
  const percentageAheadForDay = Math.round(
    (timeAheadForDay / secondsPerDay) * 100
  );

  return {
    totalMovingTime: time(totalMovingTimeSecondsForDay),
    timeAhead: time(timeAheadForDay),
    percentageAhead: percentageAheadForDay
  };
};

export default calculateDailyActivityStats;
