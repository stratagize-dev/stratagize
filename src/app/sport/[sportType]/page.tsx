import CustomSession from '@/shared/types/auth/CustomSession';
import { getServerCustomSession } from '@/shared/auth';
import { db } from '@/shared/db';
import { Suspense } from 'react';

export default async function Page({
  params
}: {
  params: { sportType: string };
}) {
  const session: CustomSession = await getServerCustomSession();

  const client = db(session.supabaseToken);

  const result = await client
    .from('activities')
    .select()
    .eq('sport_type', params.sportType);
  return (
    <Suspense fallback={<div>Loading babd Data</div>}>
      <div>My Sport: {params.sportType}</div>
      <div>{JSON.stringify(result.data)}</div>
    </Suspense>
  );
}
