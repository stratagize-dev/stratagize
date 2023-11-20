import { Activity } from '@/shared/types/Activity';
import { iterate } from '@/shared/services/sports/sportsService';
import { calculateMovingTime } from '@/shared/services/statistics';
import { time } from '@/shared/types/time';

interface Props {
  activities: Activity.Row[];
}
export function MountainBikeRide({ activities }: Props) {
  const result = iterate(activities);
  const totalMovingTime = calculateMovingTime(activities);
  return (
    <div>
      <div>Mountain Bike</div>
      <div>longest activity: {result.longestActivity().human}</div>
      <div>
        total moving time: {time(totalMovingTime.totalMovingTime)().human}
      </div>
    </div>
  );
}
