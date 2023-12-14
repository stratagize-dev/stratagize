import CustomSession from '@/shared/types/auth/CustomSession';
import { onboardAthlete } from '@/shared/services/sessionService';
import ClientSide from '@/components/client/ClientSide';
import ActivityLoadingScreen from '@/components/client/components/components/components/ActivityLoadingScreen';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { redirect } from 'next/navigation';

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

  if (athlete?.is_onboarded === false) {
    await onboardAthlete(athlete);
    redirect('onboarding');
  }

  return (
    <ClientSide session={session}>
      <ActivityLoadingScreen
        athleteId={athleteId}
        athleteHourGoal={athlete.hour_goal}
      />
    </ClientSide>
  );
}
