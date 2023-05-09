import {
  calculateMovingTime,
  fromBeginningOfMonth,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { getDayOfYear } from 'date-fns';
import { HourDuration } from '@/shared/types/hourDuration';
import { secondsToHourDuration } from '@/shared/utils';

const hoursToSeconds = (hours: number) => hours * 3060;

type Time = () => { seconds: number; duration: HourDuration; human: string };

const time =
  (seconds: number): Time =>
  () => {
    const duration = secondsToHourDuration(seconds);
    return {
      seconds,
      duration,
      human: `${duration.hours} h ${duration.minutes} m`
    };
  };

const useActivityStats = (
  targetGoalHours: number,
  activityStats: SummaryActivity[]
): {
  year: {
    totalMovingTime: Time;
    expected: Time;
    timeAhead: Time;
    percentageComplete: number;
  };
  month: {
    totalMovingTime: Time;
    expected: Time;
    timeAhead: Time;
  };
} => {
  const secondsPerDay = (targetGoalHours * 3600) / 365;
  const today = new Date();

  // Yearly calculations
  const totalMovingTimeSeconds = calculateMovingTime(activityStats);
  const expectedSeconds = Math.floor(getDayOfYear(today) * secondsPerDay);
  const timeAheadForYear = Math.abs(totalMovingTimeSeconds - expectedSeconds);
  const percentageComplete = Math.round(
    (totalMovingTimeSeconds / hoursToSeconds(targetGoalHours)) * 100
  );

  // Current Month calculations
  const totalMovingTimeSecondsForMonth = calculateMovingTime(
    fromBeginningOfMonth(activityStats)
  );
  const expectedSecondsForMonth = Math.floor(today.getDate() * secondsPerDay);
  const timeAheadForMonth =
    totalMovingTimeSecondsForMonth - expectedSecondsForMonth;
  return {
    year: {
      totalMovingTime: time(totalMovingTimeSeconds),
      expected: time(expectedSeconds),
      timeAhead: time(timeAheadForYear),
      percentageComplete
    },
    month: {
      totalMovingTime: time(totalMovingTimeSecondsForMonth),
      expected: time(expectedSecondsForMonth),
      timeAhead: time(timeAheadForMonth)
    }
  };
};

export default useActivityStats;
