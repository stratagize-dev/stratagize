import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';

import Goal from '@/components/serverSide/Goal';

export default async function Home() {
  const session = await getServerCustomSession();
  if (!session) {
    redirect('/api/auth/signin');
  }

  // const athleteId = Number(session.athleteId);
  // const { data: athlete } = await athleteRepository.get(athleteId);

  // if (athlete) {
  //   useHydrateAtoms([[annualHourGoalAtom, athlete.hour_goal]]);
  // }

  return (
    <>
      <div className="flex justify-between pt-5 pb-2 px-5 border-b">
        <div className="text-orange-500 font-semibold py-2 px-4">
          Strava Goals
        </div>
        <SignOutButton />
      </div>
      <Goal session={session} />
    </>
  );
}
