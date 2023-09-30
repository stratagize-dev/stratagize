import CustomSession from '@/shared/types/auth/CustomSession';
import athleteRepository from '@/shared/repository/athleteRepository';
import { onboardAthlete } from '@/shared/services/sessionService';
import ClientSide from '@/components/clientSide/ClientSide';
import ActivityLoadingScreen from '@/components/clientSide/components/components/components/ActivityLoadingScreen';

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
    <ClientSide session={session}>
      <ActivityLoadingScreen
        athleteId={athleteId}
        athleteHourGoal={athlete.hour_goal}
      />
    </ClientSide>
  );
}
