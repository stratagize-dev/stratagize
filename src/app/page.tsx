import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';
import Stats from '@/components/Stats';
import HourlyGoal from '@/components/HourlyGoal';
import { getActivityDataFromFirstOfMonth } from '@/shared/data/getActivityData';

export default async function Home() {
  const session = await getServerCustomSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  const activityStats = await getActivityDataFromFirstOfMonth(
    session?.accessToken
  );

  return (
    <>
      <Stats activityStats={activityStats ?? []} />
      <br />
      <SignOutButton />
    </>
  );
}
