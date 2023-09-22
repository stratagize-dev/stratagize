'use client';
import AnnualGoal from '@/components/components/components/AnnualGoal';
import MessageBlock from '@/components/components/components/MessageBlock';
import { useAtom } from 'jotai';
import { annualHourGoalAtom } from '@/app/state/atoms';
import ProgressCircle from '@/components/components/components/ProgressCircle';
import { StatsRow } from '@/components/components/components/StatsRow';
import HorizontalSpacer from '@/components/components/components/HorizontalSpacer';
import SportsBreakdown from '@/components/components/components/SportsBreakdown';
import { Activity } from '@/shared/types/Activity';
import statisticsService from '@/shared/services/statistics/statisticsService';
import { useHydrateAtoms } from 'jotai/utils';
function humanDay(days: number) {
  return days == 1 ? `${days} day` : `${days} days`;
}

interface Props {
  goalHours: number;
  activities: Activity.Row[];
}
export default function Stats({ activities, goalHours }: Props) {
  useHydrateAtoms([[annualHourGoalAtom, goalHours]]);

  const [annualHourGoal, setAnnualHourGoal] = useAtom(annualHourGoalAtom);

  const { day, month, requiredActivityPerDay, year } =
    statisticsService.calculate(annualHourGoal, activities);

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="pb-4">
          <AnnualGoal
            value={annualHourGoal}
            onYearGoalChange={hours => {
              setAnnualHourGoal(hours);
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
              message: 'Time ahead for year'
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
        <div className="flex  justify-center">
          <SportsBreakdown sportStatistics={year.sportStatistics} />
        </div>
      </div>
    </>
  );
}
