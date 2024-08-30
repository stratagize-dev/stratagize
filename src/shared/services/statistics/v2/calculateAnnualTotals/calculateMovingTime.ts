import { ActivityTotals } from '@/shared/ActivityTotals';
import { Activity, SportType } from '@/shared/types/Activity';

/**
 * calculate the total moving time for an array of activities
 * @param activities
 * @param filter
 */
export const calculateMovingTime = (
  activities: Activity.Row[],
  filter?: (activities: Activity.Row[]) => Activity.Row[]
): ActivityTotals => {
  const filterToApply = filter ? filter : (act: Activity.Row[]) => act;

  const accumulator: ActivityTotals = {
    totalMovingTime: 0,
    totalCount: 0,
    sports: { Unknown: { totalTimeSeconds: 0, count: 0 } }
  };

  return filterToApply(activities).reduce((runningTotal, currentActivity) => {
    const sportType: SportType = currentActivity.sport_type;
    const movingTime = currentActivity.moving_time;

    let total = runningTotal.sports[sportType];

    if (total === undefined) {
      total = { count: 0, totalTimeSeconds: 0 };
    }

    total.totalTimeSeconds += movingTime;
    total.count++;

    runningTotal.sports[sportType] = total;
    runningTotal.totalCount++;
    runningTotal.totalMovingTime += movingTime;

    return runningTotal;
  }, accumulator);
};
