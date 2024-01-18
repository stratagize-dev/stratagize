import './globals.css';
import { Inter } from 'next/font/google';
import { authOptions } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { NavBar } from '@/components/server/NavBar';
import { AuthOptions, getServerSession } from 'next-auth';
import CustomSession from '@/shared/types/auth/CustomSession';
import React from 'react';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
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
  // const { session: session2, athleteId } = await getAuthDetails();

  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );

  console.debug({ session });
  if (!session) {
    redirect('/api/auth/signin');
  }

  const athleteId = Number(session.athleteId);
  const athleteRepository = await createAthletesRepository();
  const { data } = await athleteRepository.get(athleteId);

  const onboardingStatus = data?.onboarding_status;
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar onboardingStatus={onboardingStatus} customSession={session} />
        {children}
      </body>
    </html>
  );
}
