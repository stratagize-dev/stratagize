import {
  calculateMovingTime,
  fromToday,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { getDaysInYear, hoursToSeconds } from 'date-fns';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';
import useAnnualActivityStats from '@/hooks/useAnnualActivityStats';
import useMonthlyActivityStats from '@/hooks/useMonthlyActivityStats';

const useActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult => {
  const daysInYear = getDaysInYear(today); // either 365 or 366
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);

  // Yearly calculations
  const year = useAnnualActivityStats(targetGoalHours, today, activityStats);

  /**
   * Current Month calculations
   */
  const month = useMonthlyActivityStats(targetGoalHours, today, activityStats);

  /**
   * Current Day calculations
   */
  const { totalMovingTime: totalMovingTimeSecondsForDay } = calculateMovingTime(
    activityStats,
    fromToday
  );
  const timeAheadForDay = totalMovingTimeSecondsForDay - secondsPerDay;
  const percentageAheadForDay = Math.round(
    (timeAheadForDay / secondsPerDay) * 100
  );

  return {
    requiredActivityPerDay: time(secondsPerDay),
    year,
    month,
    day: {
      totalMovingTime: time(totalMovingTimeSecondsForDay),
      timeAhead: time(timeAheadForDay),
      percentageAhead: percentageAheadForDay
    }
  };
};

export default useActivityStats;
