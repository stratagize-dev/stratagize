'use client';

import CustomSession from '@/shared/types/auth/CustomSession';
import { SessionProvider } from 'next-auth/react';
import Stats from '@/components/components/Stats';

interface Props {
  session: CustomSession;
}
export default function FooBaa({ session }: Props) {
  return (
    <SessionProvider session={session}>
      <Stats />
    </SessionProvider>
  );
}
