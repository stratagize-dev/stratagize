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
  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );

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
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
