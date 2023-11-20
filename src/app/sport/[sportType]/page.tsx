import CustomSession from '@/shared/types/auth/CustomSession';
import { getServerCustomSession } from '@/shared/auth';
import { Suspense } from 'react';
import { SportType } from '@/shared/types/Activity';
import { activityService } from '@/shared/services/activityService';
import { SportLoader } from '@/components/server/SportLoader';

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
