'use client';

import React from 'react';
import ClientSide from '@/components/client/ClientSide';
import CustomSession from '@/shared/types/auth/CustomSession';
import ClientLoading from '@/app/onboarding/clientLoading';

export default function Loading({
  session
}: {
  session: CustomSession | null;
}) {
  return (
    <ClientSide session={session}>
      <ClientLoading />
    </ClientSide>
  );
}
