import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import { SportType } from '@/shared/types/Activity';
import { activityService } from '@/shared/services/activityService';
import { SportLoader } from '@/components/server/SportLoader';
import { startOfYear, lastDayOfYear } from 'date-fns';

export default async function Page({
  params
}: {
  params: { sportType: SportType };
}) {
  const { athleteId } = await getAuthDetails();

  const now = new Date();
  const { data: activities } = await activityService().getActivitiesForAthlete(
    athleteId,
    startOfYear(now),
    lastDayOfYear(now),
    params.sportType
  );

  return (
    <Suspense fallback={<div>Loading Data</div>}>
      <SportLoader sportType={params.sportType} activities={activities ?? []} />
    </Suspense>
  );
}
