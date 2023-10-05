import { getServerCustomSession } from '@/shared/auth';
import CustomSession from '@/shared/types/auth/CustomSession';
import { Suspense } from 'react';
import OnboardingScreen from '@/components/client/components/components/OnboardingScreen';

export default async function Home() {
  const session: CustomSession = await getServerCustomSession();

  const athleteId = Number(session.athleteId);

  return (
    <Suspense fallback={<div>on boarding athlete.....</div>}>
      <OnboardingScreen athleteId={athleteId} session={session} />{' '}
    </Suspense>
  );
}
