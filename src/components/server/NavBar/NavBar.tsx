import SignOutButton from '@/components/client/SignOutButton';
import { SportsMenu, YearMenu } from '@/components/client/SportsMenu';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/client/ClientSide';
import Image from 'next/image';
import Link from 'next/link';
import { NavLink } from '@/components/server/NavBar/components/NavLink';
import { AdminMenu } from '@/components/client/AdminMenu/AdminMenu';
import { Toaster } from 'react-hot-toast';
import Notifications from '@/components/client/Notifications';
import { OnboardingStatus } from '@/shared/types/Athlete';
import { activityService } from '@/shared/services/activityService';
import { endOfYear, startOfYear } from 'date-fns';
import { createClient } from '@/shared/repository/utils';
import { CustomMenu } from '@/components/CustomMenu';

export function NavBar({
  customSession,
  onboardingStatus
}: {
  customSession: CustomSession | null;
  onboardingStatus?: OnboardingStatus;
}) {
  return (
    <div className="flex justify-between pt-5 pb-2 px-5 border-b">
      <Link href="/">
        <Image
          src="/Stratagize-logo/vector/default-monochrome.svg"
          alt="Stratagize"
          width={317}
          height={60}
        />
      </Link>
      <Toaster />
      <div className="flex justify-items-start items-center gap-x-4">
        {onboardingStatus === 'complete' && (
          <>
            <NavLink href="/">Today</NavLink>
            <NavLink href="/summary">Summary</NavLink>

            <ClientSide session={customSession}>
              <YearMenu />
              <SportsMenu />
              <Notifications />
            </ClientSide>
            <AdminMenu />
          </>
        )}

        <SignOutButton />
      </div>
    </div>
  );
}
