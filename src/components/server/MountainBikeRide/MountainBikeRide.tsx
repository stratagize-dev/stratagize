import { Activity } from '@/shared/types/Activity';
import { iterate } from '@/shared/services/sports/sportsService';
import { calculateMovingTime } from '@/shared/services/statistics';

interface Props {
  activities: Activity.Row[];
}
export function MountainBikeRide({ activities }: Props) {
  const result = iterate(activities);
  const totalMovingTime = calculateMovingTime(activities);
  return (
    <div>
      <div>MountainBikeRide</div>
      <div>longest activity: {result.longestActivity().human}</div>
      <div>total moving time: {result.longestActivity().human}</div>
    </div>
  );
}
