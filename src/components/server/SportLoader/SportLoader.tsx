import { Activity, SportType } from '@/shared/types/Activity';
import { MountainBikeRide } from '@/components/server/MountainBikeRide';

export function SportLoader({
  sportType,
  activities
}: {
  sportType: SportType;
  activities: Activity.Row[];
}) {
  switch (sportType) {
    case 'MountainBikeRide':
      return <MountainBikeRide activities={activities} />;
    default:
      return <div>An error has occured unsupported {sportType}</div>;
  }
}
