import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import { ActivityStatsResult } from '@/hooks/types';
import { time } from '@/shared/types/time';
import useAnnualActivityStats from '@/hooks/useAnnualActivityStats';
import useMonthlyActivityStats from '@/hooks/useMonthlyActivityStats';
import useDailyActivityStats from '@/hooks/useDailyActivityStats';
import useCommon from '@/hooks/useCommon';

const useActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult => {
  const { secondsPerDay } = useCommon(targetGoalHours, today);

  // Yearly calculations
  const year = useAnnualActivityStats(targetGoalHours, today, activityStats);

  /**
   * Current Month calculations
   */
  const month = useMonthlyActivityStats(targetGoalHours, today, activityStats);

  /**
   * Current Day calculations
   */
  const day = useDailyActivityStats(targetGoalHours, today, activityStats);

  return {
    requiredActivityPerDay: time(secondsPerDay),
    year,
    month,
    day
  };
};

export default useActivityStats;
