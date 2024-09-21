import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import OnboardingScreen from '@/components/client/components/components/OnboardingScreen';
import { SpaceTravel } from '@/components/client/space-travel';

export default async function Home() {
  const { athleteId, session } = await getAuthDetails();

  return (
    <Suspense fallback={<SpaceTravel />}>
      <OnboardingScreen athleteId={athleteId} session={session} />{' '}
    </Suspense>
  );
}
