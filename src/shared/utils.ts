import { HourDuration } from '@/shared/types/hourDuration';
import { secondsToHours } from 'date-fns';

export const secondsToHourDuration = (totalSeconds: number): HourDuration => {
  const absoluteSeconds = Math.abs(totalSeconds);
  const hours = Math.floor(secondsToHours(absoluteSeconds));
  const minutes = Math.floor((absoluteSeconds % 3600) / 60);
  const seconds = absoluteSeconds % 60;

  return {
    isAhead: totalSeconds >= 0,
    hours,
    minutes,
    seconds
  };
};
