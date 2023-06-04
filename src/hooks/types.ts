import { Time } from '@/shared/types/time';
import { SportType } from '@/shared/types/strava/sportType';

export type InternalSportType = SportType | 'unknown';
export interface SportsStatistic {
  sportType: InternalSportType;
  totalMovingTime: Time;
  percentage: number;
  activityCount: number;
}

export type ActivityStatsResult = {
  /**
   * The required activity each day to achieve the annual goal
   */
  requiredActivityPerDay: Time;

  year: {
    secondsPerDayToComplete: Time;
    totalMovingTime: Time;
    /**
     * The expected total amount of time for the current day of the year
     */
    expectedTotal: Time;
    /**
     * the amount of time ahead or behind for the current year
     * @example totalMovingTime - expectedTotal
     */
    timeAhead: Time;
    /**
     * The daily average moving time up to the current day of the year
     */
    actualDailyAverage: Time;
    projectedTotal: Time;
    percentageComplete: number;
    percentageAhead: number;
    sportStatistics: SportsStatistic[];
    activeDays: {
      /**
       * number of active days in the year
       */
      active: number;
      /**
       * current day of the year
       */
      total: number;
    };
    streaks: {
      currentStreakDays: number;
      currentStreakStartDate: Date | undefined;
      maxStreakDays: number;
      maxStreakStartDate: Date | undefined;
    };
  };
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
