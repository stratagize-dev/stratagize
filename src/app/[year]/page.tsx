import { getAuthDetails } from '@/shared/auth';

import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { endOfYear, startOfYear } from 'date-fns';
import { activityService } from '@/shared/services/activityService';
import statisticsService from '@/shared/services/statistics/statisticsService';
import { StatsRow } from '@/components/client/components/components/components/components/components/StatsRow';
import SportsBreakdown from '@/components/client/components/components/components/components/components/SportsBreakdown';
import { getTheStartOfTheYear, humanDay } from '@/shared/utils';
import { calculateAnnualTotals } from '@/shared/services/statistics/v2/calculateAnnualTotals';

export default async function Page({ params }: { params: { year: number } }) {
  const { athleteId, session } = await getAuthDetails();
  const athleteRepository = await createAthletesRepository();
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (!athlete) throw new Error('Athlete not found');

  const theStartOfTheYear = getTheStartOfTheYear(params.year);
  const theEndOfTheYear = endOfYear(theStartOfTheYear);

  const { data: activities } = await activityService().getActivitiesForAthlete(
    athleteId,
    theStartOfTheYear,
    theEndOfTheYear
  );

  const {
    totalMovingTime,
    actualDailyAverage,
    activeDays,
    sportStatistics,
    streaks
  } = calculateAnnualTotals(params.year, activities ?? []);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <StatsRow
        title={totalMovingTime().human}
        subTitle={`Total moving time for ${params.year}`}
        percentage={0}
        period="year"
        messageBlocks={[
          {
            id: 'year.actualDailyAverage',
            header: actualDailyAverage().human,
            message: 'Average daily activity time'
          }
        ]}
      />
      <StatsRow
        title={humanDay(streaks.maxStreakDays)}
        subTitle="Max activity streak"
        period="year"
        messageBlocks={[
          {
            id: 'year.streaks.activeDays',
            header: `${activeDays.active}/${humanDay(activeDays.total)}`,
            message: 'Active Days'
          }
        ]}
      />
      <div className="flex  justify-center">
        <SportsBreakdown sportStatistics={sportStatistics} />
      </div>
    </div>
  );
}
