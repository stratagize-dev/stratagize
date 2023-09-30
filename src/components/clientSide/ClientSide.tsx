'use client';

import CustomSession from '@/shared/types/auth/CustomSession';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  session: CustomSession | null;
  children?: ReactNode;
}
export default (props: Props) => (
  <SessionProvider session={props.session}>{props.children}</SessionProvider>
);
