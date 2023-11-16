import SignOutButton from '@/components/client/SignOutButton';
import { SportsMenu } from '@/components/client/SportsMenu';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/client/ClientSide';

export default function NavBar({
  customSession
}: {
  customSession: CustomSession | null;
}) {
  return (
    <div className="flex justify-between pt-5 pb-2 px-5 border-b">
      <div className="text-orange-500 font-semibold py-2 px-4">
        Strava Goals
      </div>

      <div className="flex justify-items-start items-center gap-x-4">
        <ClientSide session={customSession}>
          <SportsMenu />
        </ClientSide>

        <SignOutButton />
      </div>
    </div>
  );
}
