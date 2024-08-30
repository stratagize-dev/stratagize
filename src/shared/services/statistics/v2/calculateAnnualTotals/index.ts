import { Time, time } from '@/shared/types/time';
import {
  AnnualTotals,
  SportsStatistic
} from '@/shared/services/statistics/types';
import { Activity } from '@/shared/types/Activity';
import { calculateMovingTime } from '@/shared/services/statistics/v2/calculateAnnualTotals/calculateMovingTime';
import { getDayOfYear, getDaysInYear } from 'date-fns';
import { calculateSportsStatistics } from '@/shared/services/statistics/v2/calculateAnnualTotals/calculateSportsStatistics';
import { calculateActivityStreak } from '@/shared/services/statistics';
import { fromBeginningOfYear } from '@/shared/utils';

function calculateDayOfYear(yearToCalculateFor: number): number {
  const today = new Date();

  return yearToCalculateFor !== today.getFullYear()
    ? getDaysInYear(yearToCalculateFor)
    : getDayOfYear(today);
}

function calculateAnnualTotals(
  yearToCalculateFor: number,
  activities: Activity.Row[]
): AnnualTotals {
  const { totalMovingTime: totalMovingTimeSeconds, sports } =
    calculateMovingTime(activities);

  const dayOfYear = calculateDayOfYear(yearToCalculateFor);
  const averageDailySeconds = totalMovingTimeSeconds / dayOfYear;

  const sportStatistics = calculateSportsStatistics(
    sports,
    totalMovingTimeSeconds
  );

  const {
    maxStreak,
    currentStreak,
    currentStreakStartDate,
    maxStreakStartDate,
    activeDayCount
  } = calculateActivityStreak(activities, act =>
    fromBeginningOfYear(yearToCalculateFor, act)
  );

  return {
    totalMovingTime: time(totalMovingTimeSeconds),
    actualDailyAverage: time(averageDailySeconds),
    sportStatistics,
    activeDays: {
      active: activeDayCount,
      total: dayOfYear
    },
    streaks: {
      currentStreakDays: currentStreak,
      maxStreakDays: maxStreak,
      currentStreakStartDate,
      maxStreakStartDate
    }
  };
}

export { calculateAnnualTotals };
