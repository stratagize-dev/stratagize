import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';
import Stats from '@/components/Stats';
import HourlyGoal from '@/components/HourlyGoal';

export default async function Home() {
  const session = await getServerCustomSession();
  // console.debug({session});

  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Stats />
      <br />
      <p>You can view this page because you are signed in.</p>
      <SignOutButton />
    </>
  );
}
