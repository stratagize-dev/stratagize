import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import { SportType } from '@/shared/types/Activity';
import { activityService } from '@/shared/services/activityService';
import { SportLoader } from '@/components/server/SportLoader';

export default async function Page({
  params
}: {
  params: { sportType: SportType };
}) {
  const {athleteId} = await getAuthDetails();

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
