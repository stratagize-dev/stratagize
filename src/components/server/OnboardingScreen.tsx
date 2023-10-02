import CustomSession from '@/shared/types/auth/CustomSession';
import athleteRepository from '@/shared/repository/athleteRepository';
import { onboardAthlete } from '@/shared/services/sessionService';
import ActivityLoadingScreen from '@/components/server/components/ActivityLoadingScreen';
import { Suspense } from 'react';

export default async function OnboardingScreen({
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
    <Suspense fallback={<div>loading activity data for user</div>}>
      <ActivityLoadingScreen
        athleteId={athleteId}
        athleteHourGoal={athlete.hour_goal}
        session={session}
      />
    </Suspense>
  );
}
