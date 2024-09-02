import { getAuthDetails } from '@/shared/auth';
import { createClient } from '@/shared/repository/utils';
import { Suspense } from 'react';
import {
  TotalAchievementsSummary,
  TotalDistanceSummary,
  TotalElevationsSummary,
  TotalKudosSummary,
  TotalMovingSummary
} from '@/components/charts/bar';
import { Database } from '../../../database.types';
import { AthleteYearlySummary } from '@/shared/services/statistics/types';

export default async function Page() {
  const { athleteId } = await getAuthDetails();

  const client = await createClient();

  const result = await client
    .from('athlete_yearly_summary')
    .select('*')
    .eq('athlete_id', athleteId);

  const data = result.data ? (result.data as AthleteYearlySummary[]) : [];
  return (
    <Suspense fallback={<div>Loading Data</div>}>
      <ul className="mt-3 grid grid-cols-1 gap-4 min-[730px]:grid-cols-2 xl:grid-cols-3">
        <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-white border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
          <TotalMovingSummary data={data} />
        </li>
        <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-white border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
          <TotalDistanceSummary data={data} />
        </li>
        <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-white border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
          <TotalElevationsSummary data={data} />
        </li>
        <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-white border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
          <TotalKudosSummary data={data} />
        </li>
        <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-white border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
          <TotalAchievementsSummary data={data} />
        </li>
      </ul>
    </Suspense>
  );
}
