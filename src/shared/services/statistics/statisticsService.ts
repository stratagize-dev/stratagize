import { calculateCommon } from '@/shared/services/statistics';

import { Time, time } from '@/shared/types/time';
import calculateAnnualActivityStats from '@/shared/services/statistics/calculateAnnualActivityStats';
import { Activity } from '@/shared/types/Activity';
import calculateMonthlyActivityStats from '@/shared/services/statistics/calculateMonthlyActivityStats';
import calculateDailyActivityStats from '@/shared/services/statistics/calculateDailyActivityStats';

function calculate(targetGoalHours: number, activityStats: Activity.Row[]) {
  const today = new Date();

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
}

const statisticsService = { calculate };
export default statisticsService;
