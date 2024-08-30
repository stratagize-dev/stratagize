import { AnnualGoals, AnnualTotals } from '@/shared/services/statistics/types';
import { time } from '@/shared/types/time';
import { getDayOfYear, getDaysInYear, hoursToSeconds } from 'date-fns';

export function calculateAnnualGoalTargets(
  targetGoalHours: number,
  annualTotals: AnnualTotals
): AnnualGoals {
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const today = new Date();
  const daysInYear = getDaysInYear(new Date()); // either 365 or 366
  const dayOfYear = getDayOfYear(today); // e.g. 52nd day of year
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);
  const daysRemaining = daysInYear - dayOfYear;
  const totalMovingTimeSeconds = annualTotals.totalMovingTime().seconds;
  const secondsPerDayToComplete =
    (targetGoalSeconds - totalMovingTimeSeconds) / daysRemaining;

  const expectedSecondsPerDay = dayOfYear * secondsPerDay;

  const timeAheadForYear = totalMovingTimeSeconds - expectedSecondsPerDay;

  const averageDailySeconds = totalMovingTimeSeconds / dayOfYear;
  const projectedTotal = averageDailySeconds * daysInYear;

  const percentageAhead = Math.round(
    (timeAheadForYear / expectedSecondsPerDay) * 100
  );
  const percentageComplete = Math.round(
    (totalMovingTimeSeconds / hoursToSeconds(targetGoalHours)) * 100
  );

  return {
    secondsPerDayToComplete: time(secondsPerDayToComplete),
    expectedTotal: time(expectedSecondsPerDay),
    timeAhead: time(timeAheadForYear),
    projectedTotal: time(projectedTotal),
    percentageComplete: percentageComplete,
    percentageAhead: percentageAhead
  };
}
