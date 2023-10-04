import './globals.css';
import { Inter } from 'next/font/google';
import { getServerCustomSession } from '@/shared/auth';
import { redirect } from 'next/navigation';
import NavBar from '@/components/server/NavBar';
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
