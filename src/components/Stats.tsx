'use client';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import HourlyGoal from '@/components/HourlyGoal';
import MessageBlock from '@/components/MessageBlock';
import useActivityStats from '@/hooks/useActivityStats';
import { useAtom } from 'jotai';
import { annualHourGoalAtom } from '@/shared/atoms';
import ProgressCircle from '@/components/ProgressCircle';
import { StatsRow } from '@/components/StatsRow';

interface Props {
  activityStats: SummaryActivity[];
}
export default function Stats({ activityStats }: Props) {
  const [annualHourGoal, setAnnualHourGoal] = useAtom(annualHourGoalAtom);

  console.debug('annualHourGoal', { annualHourGoal });
  const { secondsPerDayToComplete, requiredActivityPerDay, year, month } =
    useActivityStats(annualHourGoal, new Date(), activityStats);

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <HourlyGoal
          value={annualHourGoal}
          onYearGoalChange={hours => {
            setAnnualHourGoal(hours);
          }}
        />

        <div className="py-8 flex justify-start items-center ">
          <ProgressCircle percentageComplete={year.percentageComplete} />
          <div className="pl-8">
            <MessageBlock
              header={year.projectedTotal().human}
              message={'Projected total'}
            />
          </div>
          <div className="pl-8">
            <MessageBlock
              header={requiredActivityPerDay().human}
              message={'Per day'}
            />
          </div>
          <div className="pl-8">
            <MessageBlock
              header={secondsPerDayToComplete().human}
              message={'Per day to complete'}
            />
          </div>
        </div>
        <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-16">
          <StatsRow
            title={year.totalMovingTime().human}
            subTitle="total moving time for the year"
            percentage={year.percentageAhead}
            period="year"
            messageBlocks={[
              {
                header: year.timeAhead().human,
                message: 'time ahead for year'
              },
              {
                header: year.actualDailyAverage().human,
                message: 'average daily activity time'
              }
            ]}
          />
          <StatsRow
            title={month.totalMovingTime().human}
            subTitle="total moving time for the month"
            percentage={month.percentageAhead}
            period="month"
            messageBlocks={[
              {
                header: month.timeAhead().human,
                message: `time ${
                  month.timeAhead().duration.isAhead ? 'ahead' : 'behind'
                } for month`
              },
              {
                header: month.averageDaily().human,
                message: 'average daily activity time'
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}
