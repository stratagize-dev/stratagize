import { getAuthDetails } from '@/shared/auth';
import { createClient } from '@/shared/repository/utils';
import { ReactNode, Suspense } from 'react';
import { AthleteYearlySummary } from '@/shared/services/statistics/types';
import { TotalDistanceSummary } from '@/components/charts/bar/totalDistanceSummary';
import { TotalMovingSummary } from '@/components/charts/bar/totalMovingSummary';
import { TotalElevationsSummary } from '@/components/charts/bar/totalElevationsSummary';
import { TotalKudosSummary } from '@/components/charts/bar/totalKudosSummary';
import { TotalAchievementsSummary } from '@/components/charts/bar/totalAchievementsSummary';
import { TotalActivities } from '@/components/charts/bar/totalActivitiesChart';

export default async function Page() {
  const { athleteId } = await getAuthDetails();

  const client = await createClient();

  const result = await client
    .from('athlete_yearly_summary')
    .select('*')
    .eq('athlete_id', athleteId);

  const data = result.data ? (result.data as AthleteYearlySummary[]) : [];

  const ActivityListItem = ({ children }: { children: ReactNode }) => {
    return (
      <li className=" flex w-full min-w-[200px] p-5 gap-4 flex-col items-center rounded-md border-x-2 border-b-[5px] bg-purple-50 border-t-2 border-[#EDF1F5]  hover:cursor-pointer hover:shadow-lg">
        {children}
      </li>
    );
  };
  return (
    <Suspense fallback={<div>Loading Data</div>}>
      <ul className="mt-3 grid grid-cols-1 gap-4 min-[730px]:grid-cols-2 xl:grid-cols-3">
        <ActivityListItem>
          <TotalActivities data={data} />
        </ActivityListItem>
        <ActivityListItem>
          <TotalMovingSummary data={data} />
        </ActivityListItem>
        <ActivityListItem>
          <TotalDistanceSummary data={data} />
        </ActivityListItem>
        <ActivityListItem>
          <TotalElevationsSummary data={data} />
        </ActivityListItem>
        <ActivityListItem>
          <TotalKudosSummary data={data} />
        </ActivityListItem>
        <ActivityListItem>
          <TotalAchievementsSummary data={data} />
        </ActivityListItem>
      </ul>
    </Suspense>
  );
}
