import { calculateCommon } from '@/shared/services/statistics';

import { time } from '@/shared/types/time';
import calculateAnnualActivityStats from '@/shared/services/statistics/calculateAnnualActivityStats';
import { Activity } from '@/shared/types/Activity';
import calculateMonthlyActivityStats from '@/shared/services/statistics/calculateMonthlyActivityStats';
import calculateDailyActivityStats from '@/shared/services/statistics/calculateDailyActivityStats';

/**
 * @deprecated
 * @param yearToCalculateFor
 * @param targetGoalHours
 * @param activityStats
 */
function calculate(
  yearToCalculateFor: number,
  targetGoalHours: number,
  activityStats: Activity.Row[]
) {
  const today = new Date();

  const { secondsPerDay } = calculateCommon(targetGoalHours, today);

  // Yearly calculations
  const year = calculateAnnualActivityStats(
    yearToCalculateFor,
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
}

const statisticsService = { calculate };
export default statisticsService;
