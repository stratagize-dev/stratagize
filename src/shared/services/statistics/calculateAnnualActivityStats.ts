import { hoursToSeconds } from 'date-fns';
import {
  ActivityStatsResult,
  SportsStatistic
} from '@/shared/services/statistics/types';
import { time } from '@/shared/types/time';
import { fromBeginningOfYear } from '@/shared/utils';
import { Activity, SportType } from '@/shared/types/Activity';
import {
  calculateCommon,
  calculateMovingTime,
  calculateActivityStreak
} from '@/shared/services/statistics';
function calculateSportsStatistics(
  sports: Partial<
    Record<
      SportType,
      {
        totalTimeSeconds: number;
        count: number;
      }
    >
  >,
  totalMovingTimeSeconds: number
) {
  const sportStatistics: SportsStatistic[] = [];
  for (const sportsType in sports) {
    const sportsStats = sports[sportsType as SportType];
    if (sportsStats) {
      sportStatistics.push({
        sportType: sportsType as SportType,
        totalMovingTime: time(sportsStats.totalTimeSeconds),
        percentage:
          (sportsStats.totalTimeSeconds / totalMovingTimeSeconds) * 100,
        activityCount: sportsStats.count
      });
    }
  }
  return sportStatistics;
}

const calculateAnnualActivityStats = (
  year: number,
  targetGoalHours: number,
  today: Date,
  activityStats: Activity.Row[]
): ActivityStatsResult['year'] => {
  const {
    dayOfYear,
    secondsPerDay,
    daysInYear,
    targetGoalSeconds,
    daysRemaining
  } = calculateCommon(targetGoalHours, today);

  const { totalMovingTime: totalMovingTimeSeconds, sports } =
    calculateMovingTime(activityStats);
  const expectedSecondsPerDay = dayOfYear * secondsPerDay;
  const timeAheadForYear = totalMovingTimeSeconds - expectedSecondsPerDay;
  const percentageAhead = Math.round(
    (timeAheadForYear / expectedSecondsPerDay) * 100
  );

  const percentageComplete = Math.round(
    (totalMovingTimeSeconds / hoursToSeconds(targetGoalHours)) * 100
  );
  const averageDailySeconds = totalMovingTimeSeconds / dayOfYear;
  const projectedTotal = averageDailySeconds * daysInYear;

  const secondsPerDayToComplete =
    (targetGoalSeconds - totalMovingTimeSeconds) / daysRemaining;

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
  } = calculateActivityStreak(activityStats, activities =>
    fromBeginningOfYear(year, activities)
  );

  return {
    secondsPerDayToComplete: time(secondsPerDayToComplete),
    totalMovingTime: time(totalMovingTimeSeconds),
    expectedTotal: time(expectedSecondsPerDay),
    timeAhead: time(timeAheadForYear),
    actualDailyAverage: time(averageDailySeconds),
    projectedTotal: time(projectedTotal),
    percentageComplete,
    percentageAhead,
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
};

export default calculateAnnualActivityStats;
