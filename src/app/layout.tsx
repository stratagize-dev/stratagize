import './globals.css';
import { Inter } from 'next/font/google';
import SignOutButton from '@/components/SignOutButton';
import { getServerCustomSession } from '@/shared/auth';
import { redirect } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Strava Goals',
  description: 'View your annual Strava Goals'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerCustomSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between pt-5 pb-2 px-5 border-b">
          <div className="text-orange-500 font-semibold py-2 px-4">
            Strava Goals
          </div>
          <SignOutButton />
        </div>
        {children}
      </body>
    </html>
  );
}
