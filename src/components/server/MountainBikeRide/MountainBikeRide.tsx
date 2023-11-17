import { Activity } from '@/shared/types/Activity';

interface Props {
  activities: Activity.Row[];
}
export function MountainBikeRide({ activities }: Props) {
  return (
    <div>
      <div>MountainBikeRide</div>
      <div>{JSON.stringify(activities)}</div>
    </div>
  );
}
