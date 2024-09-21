import React from 'react';

import { AuthOptions, getServerSession } from 'next-auth';
import CustomSession from '@/shared/types/auth/CustomSession';
import { authOptions } from '@/shared/auth';
import Loading from '@/app/onboarding/loading';

export default async function Onboarding() {
  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );
  return <Loading session={session} />;
}
