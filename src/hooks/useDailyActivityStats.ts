import {
  calculateMovingTime,
  fromToday,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';
import useCommon from '@/hooks/useCommon';

const useDailyActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult['day'] => {
  const { totalMovingTime: totalMovingTimeSecondsForDay } = calculateMovingTime(
    activityStats,
    fromToday
  );

  const { secondsPerDay } = useCommon(targetGoalHours, today);

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

export default useDailyActivityStats;
