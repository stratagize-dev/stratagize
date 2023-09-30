import { getServerCustomSession } from '@/shared/auth';

import athleteRepository from '@/shared/repository/athleteRepository';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/clientSide/ClientSide';
import { onboardAthlete } from '@/shared/services/sessionService';
import { Suspense } from 'react';
import { activityService } from '@/shared/services/activityService';
import Stats from '@/components/clientSide/components/Stats';

async function ActivityLoading({
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
      <Stats activities={activities ?? []} goalHours={athleteHourGoal} />;
    </Suspense>
  );
}

async function Onboarding({
  athleteId,
  session
}: {
  athleteId: number;
  session: CustomSession;
}) {
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (!athlete) throw new Error('Athlete not found');

  if (athlete?.is_onboarded === false && session.accessToken) {
    await onboardAthlete(athlete, session.accessToken);
  }

  return (
    <ClientSide session={session}>
      <ActivityLoading
        athleteId={athleteId}
        athleteHourGoal={athlete.hour_goal}
      />
    </ClientSide>
  );
}
export default async function Home() {
  const session: CustomSession =
    (await getServerCustomSession()) as CustomSession;

  const athleteId = Number(session.athleteId);

  return (
    <Suspense fallback={<div>on boarding athlete.....</div>}>
      <Onboarding athleteId={athleteId} session={session} />{' '}
    </Suspense>
  );
}
