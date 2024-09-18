'use client';
import AnnualGoal from '@/components/client/components/components/components/components/components/AnnualGoal';
import MessageBlock from '@/components/MessageBlock';
import { useAtom } from 'jotai';
import { annualHourGoalAtom } from '@/components/client/state/atoms';
import ProgressCircle from '@/components/client/components/components/components/components/components/ProgressCircle';
import { StatsRow } from '@/components/client/components/components/components/components/components/StatsRow';
import HorizontalSpacer from '@/components/HorizontalSpacer';
import { Activity } from '@/shared/types/Activity';
import { useHydrateAtoms } from 'jotai/utils';
import { db } from '@/shared/db';
import useSubscribeToActivityUpdates from '@/components/client/hooks/useSubscribeToActivityUpdates';
import useCustomSession from '@/components/client/hooks/useCustomSession';
import { humanDay } from '@/shared/utils';
import statisticsService from '@/shared/services/statistics/v2/statisticsServiceV2';

interface Props {
  athleteId: number;
  goalHours: number;
  activities: Activity.Row[];
}

const updateAthleteHours = async (
  supabaseToken: string,
  athleteId: number,
  hours: number
) =>
  db(supabaseToken)
    .from('athletes')
    .update({ hour_goal: hours })
    .eq('id', athleteId)
    .select();

export default function Stats({ athleteId, activities, goalHours }: Props) {
  useHydrateAtoms([[annualHourGoalAtom, goalHours]]);

  const { customSession } = useCustomSession();
  const latestActivities = useSubscribeToActivityUpdates(athleteId, activities);

  const [annualHourGoal, setAnnualHourGoal] = useAtom(annualHourGoalAtom);

  const { day, month, requiredActivityPerDay, year } =
    statisticsService.calculate(annualHourGoal, latestActivities);

  if (customSession === null) return null;

  return (
    <>
      <div className="pb-4">
        <AnnualGoal
          value={annualHourGoal}
          onYearGoalChange={async hours => {
            setAnnualHourGoal(hours);
            await updateAthleteHours(
              customSession.supabaseToken,
              athleteId,
              hours
            );
          }}
        />
      </div>
      <HorizontalSpacer />
      <div
        className={`grid gap-4 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4 `}
      >
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <ProgressCircle percentageComplete={year.percentageComplete} />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <MessageBlock
            header={year.projectedTotal().human}
            message={'Projected total'}
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <MessageBlock
            header={requiredActivityPerDay().human}
            message={'Per day'}
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <MessageBlock
            header={year.secondsPerDayToComplete().human}
            message={'Per day to complete'}
          />
        </div>
      </div>
      <HorizontalSpacer />
      <StatsRow
        title={year.totalMovingTime().human}
        subTitle="Total moving time for the year"
        percentage={year.percentageAhead}
        period="year"
        messageBlocks={[
          {
            id: 'year.timeAhead',
            header: year.timeAhead().human,
            message: `Time ${
              year.timeAhead().duration.isAhead ? 'ahead' : 'behind'
            } for year`
          },
          {
            id: 'year.actualDailyAverage',
            header: year.actualDailyAverage().human,
            message: 'Average daily activity time'
          }
        ]}
      />
      <StatsRow
        title={month.totalMovingTime().human}
        subTitle="Total moving time for the month"
        percentage={month.percentageAhead}
        period="month"
        messageBlocks={[
          {
            id: 'month.timeAhead',
            header: month.timeAhead().human,
            message: `Time ${
              month.timeAhead().duration.isAhead ? 'ahead' : 'behind'
            } for month`
          },
          {
            id: 'month.averageDaily',
            header: month.averageDaily().human,
            message: 'Average daily activity time'
          }
        ]}
      />
      <StatsRow
        title={day.totalMovingTime().human}
        subTitle="Total moving time for the day"
        percentage={day.percentageAhead}
        period="day"
        messageBlocks={[
          {
            id: 'day.timeAhead',
            header: day.timeAhead().human,
            message: `Time ${
              day.timeAhead().duration.isAhead ? 'ahead' : 'behind'
            } for day`
          }
        ]}
      />
      <StatsRow
        title={humanDay(year.streaks.maxStreakDays)}
        subTitle="Max activity streak"
        period="year"
        messageBlocks={[
          {
            id: 'year.streaks.currentStreakDays',
            header: humanDay(year.streaks.currentStreakDays),
            message: 'Current activity streak'
          },
          {
            id: 'year.streaks.activeDays',
            header: `${year.activeDays.active}/${humanDay(
              year.activeDays.total
            )}`,
            message: 'Active Days'
          }
        ]}
      />
    </>
  );
}
