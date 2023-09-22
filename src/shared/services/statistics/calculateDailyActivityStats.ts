import { ActivityStatsResult } from '@/shared/services/statistics/types';
import { time } from '@/shared/types/time';
import { fromToday } from '@/shared/utils';
import { calculateMovingTime } from '@/shared/services/statistics/calculateMovingTime';
import { calculateCommon } from '@/shared/services/statistics/calculateCommon';
import { Activity } from '@/shared/types/Activity';
const calculateDailyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: Activity.Row[]
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
