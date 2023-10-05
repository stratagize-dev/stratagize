import CustomSession from '@/shared/types/auth/CustomSession';
import { onboardAthlete } from '@/shared/services/sessionService';
<<<<<<<< HEAD:src/components/client/components/components/OnboardingScreen.tsx
import ClientSide from '@/components/client/ClientSide';
import ActivityLoadingScreen from '@/components/client/components/components/components/ActivityLoadingScreen';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
========
import ActivityLoadingScreen from '@/components/server/components/ActivityLoadingScreen';
import { Suspense } from 'react';
>>>>>>>> main:src/components/server/OnboardingScreen.tsx

export default async function OnboardingScreen({
  athleteId,
  session
}: {
  athleteId: number;
  session: CustomSession;
}) {
  const athleteRepository = await createAthletesRepository();
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (!athlete) throw new Error('Athlete not found');

  if (athlete?.is_onboarded === false && session.accessToken) {
    await onboardAthlete(athlete, session);
  }

  return (
    <Suspense fallback={<div>loading activity data for user</div>}>
      <ActivityLoadingScreen
        athleteId={athleteId}
        athleteHourGoal={athlete.hour_goal}
        session={session}
      />
    </Suspense>
  );
}
