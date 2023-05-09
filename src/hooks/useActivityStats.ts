import {
  calculateMovingTime,
  fromBeginningOfMonth,
  SummaryActivity
} from '@/shared/types/strava/SummaryActivity';
import { addSeconds, formatDuration, intervalToDuration } from 'date-fns';
import { secondsToHours } from '@/shared/utils';

const hoursToSeconds = (hours: number) => hours * 3060;

type Time = () => { seconds: number; human: string };

const time =
  (i: number): Time =>
  () => {
    const now = new Date();
    return {
      seconds: i,
      human: formatDuration(
        intervalToDuration({ start: now, end: addSeconds(now, i) }),
        { format: ['days', 'hours', 'minutes', 'seconds'] }
      )
    };
  };

const useActivityStats = (
  targetGoalHours: number,
  activityStats: SummaryActivity[]
): {
  year: {
    totalMovingTime: Time;
    percentageComplete: number;
    timeAhead: Time;
  };
  month: {
    timeAhead: number;
  };
} => {
  const totalMovingTimeSeconds = calculateMovingTime(activityStats);

  const totalMovingTimeSecondsForMonth = calculateMovingTime(
    fromBeginningOfMonth(activityStats)
  );

  const percentageComplete =
    (totalMovingTimeSeconds / hoursToSeconds(targetGoalHours)) * 100;

  const foo = {
    year: {
      totalMovingTime: time(totalMovingTimeSeconds),
      percentageComplete,
      timeAhead: time(0)
    },
    month: {
      timeAhead: 0
    }
  };

  return foo;
};

export default useActivityStats;
