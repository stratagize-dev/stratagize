import { HourDuration } from '@/shared/types/hourDuration';
import { secondsToHourDuration } from '@/shared/utils';

export type Time = () => {
  seconds: number;
  duration: HourDuration;
  human: string;
};

export const time =
  (seconds: number): Time =>
  () => {
    const duration = secondsToHourDuration(seconds);
    return {
      seconds,
      duration,
      human:
        duration.hours > 0
          ? `${duration.hours} h ${duration.minutes} m`
          : `${duration.minutes} m`
    };
  };
