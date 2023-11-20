import SignOutButton from '@/components/client/SignOutButton';
import { SportsMenu } from '@/components/client/SportsMenu';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/client/ClientSide';
import Image from 'next/image';
import Link from 'next/link';
import { NavLink } from '@/components/server/NavBar/components/NavLink';
import { AdminMenu } from '@/components/client/AdminMenu/AdminMenu';

export function NavBar({
  customSession
}: {
  customSession: CustomSession | null;
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

      <div className="flex justify-items-start items-center gap-x-4">
        <NavLink href="/">Today</NavLink>
        <NavLink href="/">Month</NavLink>
        <NavLink href="/">Year</NavLink>
        <ClientSide session={customSession}>
          <SportsMenu />
        </ClientSide>
        <AdminMenu />
        <SignOutButton />
      </div>
    </div>
  );
}
