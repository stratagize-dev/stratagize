import { Activity } from '@/shared/types/Activity';
import { Time, time } from '@/shared/types/time';

export function iterate(activities: Activity.Row[]): { longestActivity: Time } {
  let longestActivity = 0;

  activities.forEach(activity => {
    if (activity.moving_time > longestActivity) {
      longestActivity = activity.moving_time;
    }
  });

  return {
    longestActivity: time(longestActivity)
  };
}
