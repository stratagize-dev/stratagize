import { getDayOfYear } from 'date-fns';
import { Activity } from '@/shared/types/Activity';

export const calculateActivityStreak = (
  activities: Activity.Row[],
  filter?: (activities: Activity.Row[]) => Activity.Row[]
) => {
  const filterActivities = filter ? filter : (act: Activity.Row[]) => act;

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDay = 0;
  let currentStreakStartDate: Date | undefined = undefined;
  let maxStreakStartDate: Date | undefined = undefined;
  let activeDayCount = 0;
  filterActivities(activities).forEach(summaryActivity => {
    if (!summaryActivity.start_date) {
      return;
    }
    const activityDate = new Date(summaryActivity.start_date);
    const activityDay = getDayOfYear(activityDate);

    if (activityDay === previousDay) return; // multiple activities for the same day

    activeDayCount++;

    if (activityDay - previousDay === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
      currentStreakStartDate = activityDate;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxStreakStartDate = currentStreakStartDate;
    }
    previousDay = activityDay;
  });

  return {
    activeDayCount,
    maxStreak,
    maxStreakStartDate,
    currentStreak,
    currentStreakStartDate
  };
};
