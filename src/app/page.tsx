import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';
import Stats from '@/components/Stats';
import { getActivityDataFromFirstOfYear } from '@/shared/data/getActivityData';

export default async function Home() {
  const session = await getServerCustomSession();
  // console.debug('session', session);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const activityStats = await getActivityDataFromFirstOfYear(
    session?.accessToken
  );

  return (
    <>
      <div className="flex justify-between pt-5 pb-2 px-5 border-b">
        <div className="text-orange-500 font-semibold py-2 px-4">
          Strava Goals
        </div>
        <SignOutButton />
      </div>
      <Stats activityStats={activityStats ?? []} />
    </>
  );
}
