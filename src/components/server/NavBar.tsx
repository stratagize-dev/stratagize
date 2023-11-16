import SignOutButton from '@/components/client/SignOutButton';
import { SportsMenu } from '@/components/client/SportsMenu';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientSide from '@/components/client/ClientSide';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar({
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
        <ClientSide session={customSession}>
          <SportsMenu />
        </ClientSide>

        <SignOutButton />
      </div>
    </div>
  );
}
