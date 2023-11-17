import CustomSession from '@/shared/types/auth/CustomSession';
import { getServerCustomSession } from '@/shared/auth';
import { Suspense } from 'react';
import { Activity, SportType } from '@/shared/types/Activity';
import { MountainBikeRide } from '@/components/server/MountainBikeRide';
import { activityService } from '@/shared/services/activityService';

function SportLoader({
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

export default async function Page({
  params
}: {
  params: { sportType: SportType };
}) {
  const session: CustomSession = await getServerCustomSession();

  const athleteId = Number(session.athleteId);

  const { data: activities } = await activityService().getActivitiesForAthlete(
    athleteId,
    params.sportType
  );

  return (
    <Suspense fallback={<div>Loading Data</div>}>
      <SportLoader sportType={params.sportType} activities={activities ?? []} />
    </Suspense>
  );
}
