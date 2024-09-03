import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import { SportType } from '@/shared/types/Activity';
import {
  SportLoader,
  SportsAllTimeStats,
  SportsYearlyStats
} from '@/components/server/SportLoader';
import { createClient } from '@/shared/repository/utils';
import { formatSportsTypeName } from '@/shared/formatting';
import HorizontalSpacer from '@/components/HorizontalSpacer';

export default async function Page({
  params
}: {
  params: { sportType: SportType };
}) {
  const { athleteId } = await getAuthDetails();

  const client = await createClient();

  const { data } = await client
    .from('athlete_sport_all_time_stats')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('sport_type', params.sportType)
    .single();

  const { data: yearlyData } = await client
    .from('athlete_sport_yearly_stats')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('sport_type', params.sportType);

  return (
    <Suspense fallback={<div>Loading Data</div>}>
      <div>
        <h1 className="text-center text-3xl font-extrabold text-gray-500">
          {formatSportsTypeName(params.sportType)}
        </h1>
        <HorizontalSpacer />
        <SportLoader
          allTimeStats={data as SportsAllTimeStats}
          yearlyStats={yearlyData as SportsYearlyStats[]}
          sportType={params.sportType}
        />
      </div>
    </Suspense>
  );
}
