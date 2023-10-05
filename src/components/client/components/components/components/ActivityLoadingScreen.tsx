import { activityService } from '@/shared/services/activityService';
import { Suspense } from 'react';
import Stats from '@/components/client/components/components/components/components/Stats';

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal
}: {
  athleteId: number;
  athleteHourGoal: number;
}) {
  const { data: activities } = await activityService.getActivitiesForAthlete(
    athleteId
  );

  return (
    <Suspense fallback={<div>loading activity data</div>}>
      <Stats
        athleteId={athleteId}
        activities={activities ?? []}
        goalHours={athleteHourGoal}
      />
    </Suspense>
  );
}
