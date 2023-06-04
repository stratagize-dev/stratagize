import {
  calculateActivityStreak,
  calculateMovingTime,
  fromBeginningOfYear,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { getDayOfYear, getDaysInYear, hoursToSeconds } from 'date-fns';
import {
  ActivityStatsResult,
  InternalSportType,
  SportsStatistic
} from '@/hooks/types';
import { time } from '@/shared/types/time';

const useAnnualActivityStats = (
  targetGoalHours: number,
  today: Date,
  activityStats: SummaryActivity[]
): ActivityStatsResult['year'] => {
  const daysInYear = getDaysInYear(today); // either 365 or 366
  const dayOfYear = getDayOfYear(today); // e.g. 52nd day of year
  const daysRemaining = daysInYear - dayOfYear;
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);
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

  const sportStatistics: SportsStatistic[] = [];
  for (const sportsType in sports) {
    const sportsStats = sports[sportsType];
    sportStatistics.push({
      sportType: sportsType as InternalSportType,
      totalMovingTime: time(sportsStats.totalTimeSeconds),
      percentage: (sportsStats.totalTimeSeconds / totalMovingTimeSeconds) * 100,
      activityCount: sportsStats.count
    });
  }
  const {
    maxStreak,
    currentStreak,
    currentStreakStartDate,
    maxStreakStartDate
  } = calculateActivityStreak(activityStats, fromBeginningOfYear);

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
    streaks: {
      currentStreakDays: currentStreak,
      maxStreakDays: maxStreak,
      currentStreakStartDate,
      maxStreakStartDate
    }
  };
};

export default useAnnualActivityStats;
