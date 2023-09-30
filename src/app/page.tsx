import { getServerCustomSession } from '@/shared/auth';

import athleteRepository from '@/shared/repository/athleteRepository';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/clientSide/ClientSide';
import { onboardAthlete } from '@/shared/services/sessionService';
import { Suspense } from 'react';
import { activityService } from '@/shared/services/activityService';
import Stats from '@/components/clientSide/components/Stats';

export default async function Home() {
  const session: CustomSession =
    (await getServerCustomSession()) as CustomSession;

  const athleteId = Number(session.athleteId);

  const { data: athlete } = await athleteRepository.get(athleteId);

  if (athlete?.is_onboarded === false && session.accessToken) {
    await onboardAthlete(athlete, session.accessToken);
  }

  const { data: activities } = await activityService.getActivitiesForAthlete(
    athleteId
  );

  if (!athlete) throw new Error('Athlete not found');
  return (
    <Suspense fallback={<div>on boarding athlete.....</div>}>
      <ClientSide session={session}>
        <Stats activities={activities ?? []} goalHours={athlete.hour_goal} />
      </ClientSide>
    </Suspense>
  );
}
