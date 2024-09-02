import { Time } from '@/shared/types/time';
import { SportType } from '@/shared/types/Activity';
import { Database } from '../../../../database.types';

export interface SportsStatistic {
  sportType: SportType;
  totalMovingTime: Time;
  percentage: number;
  activityCount: number;
}

export type AnnualTotals = {
  totalMovingTime: Time;
  actualDailyAverage: Time;
  sportStatistics: SportsStatistic[];
  activeDays: {
    active: number;
    total: number;
  };
  streaks: {
    currentStreakDays: number;
    maxStreakDays: number;
    currentStreakStartDate: Date | undefined;
    maxStreakStartDate: Date | undefined;
  };
};

export type AnnualGoals = {
  secondsPerDayToComplete: Time;
  /**
   * The expected total amount of time for the current day of the year
   */
  expectedTotal: Time;
  /**
   * the amount of time ahead or behind for the current year
   * @example totalMovingTime - expectedTotal
   */
  timeAhead: Time;

  projectedTotal: Time;
  percentageComplete: number;
  percentageAhead: number;
};

export type ActivityStatsResult = {
  /**
   * The required activity each day to achieve the annual goal
   */
  requiredActivityPerDay: Time;

  year: AnnualTotals & AnnualGoals;

  month: {
    totalMovingTime: Time;
    /**
     * The expected total amount of time for the current day of the month
     */
    expectedTotal: Time;
    timeAhead: Time;
    averageDaily: Time;
    percentageAhead: number;
  };
  day: {
    totalMovingTime: Time;
    timeAhead: Time;
    percentageAhead: number;
  };
};

export type AthleteYearlySummary =
  Database['public']['Views']['athlete_yearly_summary']['Row'];
