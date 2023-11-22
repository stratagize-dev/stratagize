import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import OnboardingScreen from '@/components/client/components/components/OnboardingScreen';

export default async function Home() {
  const { athleteId, session } = await getAuthDetails();

  return (
    <Suspense fallback={<div>Loading Athlete Data</div>}>
      <OnboardingScreen athleteId={athleteId} session={session} />{' '}
    </Suspense>
  );
}
