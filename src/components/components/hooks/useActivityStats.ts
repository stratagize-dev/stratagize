import { ActivityStatsResult } from '@/components/components/hooks/types';
import { time } from '@/shared/types/time';
import calculateAnnualActivityStats from '@/components/components/hooks/utils/calculateAnnualActivityStats';
import calculateMonthlyActivityStats from '@/components/components/hooks/utils/calculateMonthlyActivityStats';
import calculateDailyActivityStats from '@/components/components/hooks/utils/calculateDailyActivityStats';
import calculateCommon from '@/components/components/hooks/utils/calculateCommon';
import { useEffect, useMemo } from 'react';
import { ActivitySummary } from '@/shared/types/ActivitySummary';

const useActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: ActivitySummary[]
): ActivityStatsResult => {
  const result = useMemo(() => {
    const { secondsPerDay } = calculateCommon(targetGoalHours, today);

    // Yearly calculations
    const year = calculateAnnualActivityStats(
      targetGoalHours,
      today,
      activityStats
    );

    /**
     * Current Month calculations
     */
    const month = calculateMonthlyActivityStats(
      targetGoalHours,
      today,
      activityStats
    );

    /**
     * Current Day calculations
     */
    const day = calculateDailyActivityStats(
      targetGoalHours,
      today,
      activityStats
    );

    return {
      requiredActivityPerDay: time(secondsPerDay),
      year,
      month,
      day
    };
  }, [targetGoalHours, today, activityStats]);

  console.debug('stuart', 'calculationg', {
    targetGoalHours,
    today,
    activityStats,
    result
  });
  return result;
};

export default useActivityStats;
