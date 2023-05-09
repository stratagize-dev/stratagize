import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';
import Stats from '@/components/Stats';
import { getActivityDataFromFirstOfYear } from '@/shared/data/getActivityData';

export default async function Home() {
  const session = await getServerCustomSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  const activityStats = await getActivityDataFromFirstOfYear(
    session?.accessToken
  );

  return (
    <>
      <SignOutButton />
      <Stats activityStats={activityStats ?? []} />
    </>
  );
}
