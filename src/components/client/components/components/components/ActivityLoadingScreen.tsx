import { activityService } from '@/shared/services/activityService';
<<<<<<<< HEAD:src/components/client/components/components/components/ActivityLoadingScreen.tsx
import { Suspense } from 'react';
import Stats from '@/components/client/components/components/components/components/Stats';

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal
}: {
  athleteId: number;
  athleteHourGoal: number;
}) {
  const { data: activities } = await activityService().getActivitiesForAthlete(
========
import Stats from '@/components/client/Stats';
import ClientSide from '@/components/client/ClientSide';
import CustomSession from '@/shared/types/auth/CustomSession';

interface Props {
  athleteId: number;
  athleteHourGoal: number;
  session: CustomSession;
}

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal,
  session
}: Props) {
  const { data: activities } = await activityService.getActivitiesForAthlete(
>>>>>>>> main:src/components/server/components/ActivityLoadingScreen.tsx
    athleteId
  );

  return (
    <ClientSide session={session}>
      <Stats
        athleteId={athleteId}
        activities={activities ?? []}
        goalHours={athleteHourGoal}
      />
    </ClientSide>
  );
}
