import { activityService } from '@/shared/services/activityService/activityService';
import { Suspense } from 'react';
import Stats from '@/components/client/components/components/components/components/Stats';
import { endOfYear, startOfYear } from 'date-fns';

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal,
  year
}: {
  athleteId: number;
  athleteHourGoal: number;
  year: number;
}) {
  const theStartOfTheYear = startOfYear(new Date(year, 0, 1));
  const theEndOfTheYear = endOfYear(theStartOfTheYear);

  const { data: activities } = await activityService().getActivitiesForAthlete(
    athleteId,

    theStartOfTheYear,
    theEndOfTheYear
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
