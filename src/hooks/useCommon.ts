import { getDayOfYear, getDaysInYear, hoursToSeconds } from 'date-fns';

export default function useCommon(targetGoalHours: number, today: Date) {
  const daysInYear = getDaysInYear(today); // either 365 or 366
  const targetGoalSeconds = hoursToSeconds(targetGoalHours);
  const secondsPerDay = Math.floor(targetGoalSeconds / daysInYear);
  const dayOfMonth = today.getDate();
  const dayOfYear = getDayOfYear(today); // e.g. 52nd day of year
  const daysRemaining = daysInYear - dayOfYear;

  return {
    daysInYear,
    targetGoalSeconds,
    secondsPerDay,
    dayOfMonth,
    dayOfYear,
    daysRemaining
  };
}
