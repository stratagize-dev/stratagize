import './globals.css';
import { Inter } from 'next/font/google';
import { authOptions } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { NavBar } from '@/components/server/NavBar';
import { AuthOptions, getServerSession } from 'next-auth';
import CustomSession from '@/shared/types/auth/CustomSession';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stratagize',
  description: 'View your annual Strava Goals'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar customSession={session} />
        {children}
      </body>
    </html>
  );
}
