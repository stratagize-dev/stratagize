import { time } from '@/shared/types/time';
import { Activity } from '@/shared/types/Activity';
import { calculateAnnualTotals } from '@/shared/services/statistics/v2/calculateAnnualTotals';
import { ActivityStatsResult } from '@/shared/services/statistics/types';
import { calculateAnnualGoalTargets } from '@/shared/services/statistics/v2/calculateAnnualGoalTargets';
import calculateMonthlyActivityStats from '@/shared/services/statistics/v2/calculateMonthlyActivityStats';
import calculateDailyActivityStats from '@/shared/services/statistics/v2/calculateDailyActivityStats';
import { calculateCommon } from '@/shared/services/statistics/v2/calculateCommon';
import { getYear } from 'date-fns';

function calculate(
  targetGoalHours: number,
  activities: Activity.Row[]
): ActivityStatsResult {
  const today = new Date();

  const { secondsPerDay } = calculateCommon(targetGoalHours, today);

  // Yearly calculations
  const annualTotals = calculateAnnualTotals(getYear(today), activities);

  const annualGoals = calculateAnnualGoalTargets(targetGoalHours, annualTotals);

  /**
   * Current Month calculations
   */
  const month = calculateMonthlyActivityStats(
    targetGoalHours,
    today,
    activities
  );

  /**
   * Current Day calculations
   */
  const day = calculateDailyActivityStats(targetGoalHours, today, activities);

  return {
    requiredActivityPerDay: time(secondsPerDay),
    year: {
      ...annualGoals,
      ...annualTotals
    },
    month,
    day
  };
}

const statisticsService = { calculate };
export default statisticsService;
