import { activityService } from '@/shared/services/activityService/activityService';
import { Suspense } from 'react';
import Stats from '@/components/client/components/components/components/components/Stats';
import { endOfYear, startOfYear } from 'date-fns';

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal
}: {
  athleteId: number;
  athleteHourGoal: number;
}) {
  const now = new Date();
  const { data: activities } = await activityService().getActivitiesForAthlete(
    athleteId,
    startOfYear(now),
    endOfYear(now)
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
