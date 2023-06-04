import { MetaActivity } from '@/shared/types/strava/MetaActivity';
import { MetaAthlete } from '@/shared/types/strava/MetaAthlete';
import { ActivityType } from '@/shared/types/strava/ActivityType';
import { SportType } from '@/shared/types/strava/sportType';
import { LatLng } from '@/shared/types/strava/latLng';
import { PolylineMap } from '@/shared/types/strava/PolylineMap';
import {
  getDayOfYear,
  startOfMonth,
  startOfToday,
  startOfYear
} from 'date-fns';
import { ActivityTotals } from '@/shared/ActivityTotals';
import { InternalSportType } from '@/hooks/types';

export const calculateActivityStreak = (
  activities: SummaryActivity[],
  filter?: (activities: SummaryActivity[]) => SummaryActivity[]
) => {
  const filterActivities = filter ? filter : (act: SummaryActivity[]) => act;

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDay = 0;
  let currentStreakStartDate: Date | undefined = undefined;
  let maxStreakStartDate: Date | undefined = undefined;
  filterActivities(activities).forEach(summaryActivity => {
    if (!summaryActivity.start_date) {
      return;
    }
    const activityDate = new Date(summaryActivity.start_date);
    const activityDay = getDayOfYear(activityDate);

    if (activityDay === previousDay) return; // multiple activities for the same day

    if (activityDay - previousDay === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
      currentStreakStartDate = activityDate;
    }
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxStreakStartDate = currentStreakStartDate;
    }
    previousDay = activityDay;
  });

  return {
    maxStreak,
    maxStreakStartDate,
    currentStreak,
    currentStreakStartDate
  };
};
export const calculateMovingTime = (
  activities: SummaryActivity[],
  filter?: (activities: SummaryActivity[]) => SummaryActivity[]
): ActivityTotals => {
  const filterToApply = filter ? filter : (act: SummaryActivity[]) => act;

  const accumulator: ActivityTotals = {
    totalMovingTime: 0,
    totalCount: 0,
    sports: { unknown: { totalTimeSeconds: 0, count: 0 } }
  };

  return filterToApply(activities).reduce((runningTotal, currentActivity) => {
    const sportType: InternalSportType =
      currentActivity.sport_type ?? 'unknown';
    const movingTime = currentActivity.moving_time ?? 0;
    if (!runningTotal.sports[sportType]) {
      runningTotal.sports[sportType] = { count: 0, totalTimeSeconds: 0 };
    }

    runningTotal.sports[sportType].totalTimeSeconds += movingTime;
    runningTotal.sports[sportType].count++;
    runningTotal.totalCount++;
    runningTotal.totalMovingTime += movingTime;

    return runningTotal;
  }, accumulator);
};

const filterFromDate = (
  activities: SummaryActivity[],
  fromDate: Date
): SummaryActivity[] => {
  return activities.filter(activity => {
    return activity.start_date
      ? new Date(activity.start_date) > fromDate //BUG startOfMonthDate
      : false;
  });
};

export const fromToday = (activities: SummaryActivity[]): SummaryActivity[] =>
  filterFromDate(activities, startOfToday());

export const fromBeginningOfMonth = (
  activities: SummaryActivity[]
): SummaryActivity[] => filterFromDate(activities, startOfMonth(new Date()));

export const fromBeginningOfYear = (
  activities: SummaryActivity[]
): SummaryActivity[] => filterFromDate(activities, startOfYear(new Date()));

/**
 *
 * @export
 * @interface SummaryActivity
 */
export interface SummaryActivity extends MetaActivity {
  /**
   * The identifier provided at upload time
   * @type {string}
   * @memberof SummaryActivity
   */
  externalId?: string;
  /**
   * The identifier of the upload that resulted in this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  uploadId?: number;
  /**
   *
   * @type {MetaAthlete}
   * @memberof SummaryActivity
   */
  athlete?: MetaAthlete;
  /**
   * The name of the activity
   * @type {string}
   * @memberof SummaryActivity
   */
  name?: string;
  /**
   * The activity's distance, in meters
   * @type {number}
   * @memberof SummaryActivity
   */
  distance?: number;
  /**
   * The activity's moving time, in seconds
   * @type {number}
   * @memberof SummaryActivity
   */
  moving_time?: number;
  /**
   * The activity's elapsed time, in seconds
   * @type {number}
   * @memberof SummaryActivity
   */
  elapsedTime?: number;
  /**
   * The activity's total elevation gain.
   * @type {number}
   * @memberof SummaryActivity
   */
  totalElevationGain?: number;
  /**
   * The activity's highest elevation, in meters
   * @type {number}
   * @memberof SummaryActivity
   */
  elevHigh?: number;
  /**
   * The activity's lowest elevation, in meters
   * @type {number}
   * @memberof SummaryActivity
   */
  elevLow?: number;
  /**
   * Deprecated. Prefer to use sport_type
   * @type {ActivityType}
   * @memberof SummaryActivity
   */
  type?: ActivityType;
  /**
   *
   * @type {SportType}
   * @memberof SummaryActivity
   */
  sport_type?: SportType;
  /**
   * The time at which the activity was started.
   * @type {Date}
   * @memberof SummaryActivity
   */
  start_date?: string;
  /**
   * The time at which the activity was started in the local timezone.
   * @type {Date}
   * @memberof SummaryActivity
   */
  start_date_local?: string;
  /**
   * The timezone of the activity
   * @type {string}
   * @memberof SummaryActivity
   */
  timezone?: string;
  /**
   *
   * @type {LatLng}
   * @memberof SummaryActivity
   */
  startLatlng?: LatLng;
  /**
   *
   * @type {LatLng}
   * @memberof SummaryActivity
   */
  endLatlng?: LatLng;
  /**
   * The number of achievements gained during this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  achievementCount?: number;
  /**
   * The number of kudos given for this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  kudosCount?: number;
  /**
   * The number of comments for this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  commentCount?: number;
  /**
   * The number of athletes for taking part in a group activity
   * @type {number}
   * @memberof SummaryActivity
   */
  athleteCount?: number;
  /**
   * The number of Instagram photos for this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  photoCount?: number;
  /**
   * The number of Instagram and Strava photos for this activity
   * @type {number}
   * @memberof SummaryActivity
   */
  totalPhotoCount?: number;
  /**
   *
   * @type {PolylineMap}
   * @memberof SummaryActivity
   */
  map?: PolylineMap;
  /**
   * Whether this activity was recorded on a training machine
   * @type {boolean}
   * @memberof SummaryActivity
   */
  trainer?: boolean;
  /**
   * Whether this activity is a commute
   * @type {boolean}
   * @memberof SummaryActivity
   */
  commute?: boolean;
  /**
   * Whether this activity was created manually
   * @type {boolean}
   * @memberof SummaryActivity
   */
  manual?: boolean;
  /**
   * Whether this activity is private
   * @type {boolean}
   * @memberof SummaryActivity
   */
  _private?: boolean;
  /**
   * Whether this activity is flagged
   * @type {boolean}
   * @memberof SummaryActivity
   */
  flagged?: boolean;
  /**
   * The activity's workout type
   * @type {number}
   * @memberof SummaryActivity
   */
  workoutType?: number;
  /**
   * The unique identifier of the upload in string format
   * @type {string}
   * @memberof SummaryActivity
   */
  uploadIdStr?: string;
  /**
   * The activity's average speed, in meters per second
   * @type {number}
   * @memberof SummaryActivity
   */
  averageSpeed?: number;
  /**
   * The activity's max speed, in meters per second
   * @type {number}
   * @memberof SummaryActivity
   */
  maxSpeed?: number;
  /**
   * Whether the logged-in athlete has kudoed this activity
   * @type {boolean}
   * @memberof SummaryActivity
   */
  hasKudoed?: boolean;
  /**
   * Whether the activity is muted
   * @type {boolean}
   * @memberof SummaryActivity
   */
  hideFromHome?: boolean;
  /**
   * The id of the gear for the activity
   * @type {string}
   * @memberof SummaryActivity
   */
  gearId?: string;
  /**
   * The total work done in kilojoules during this activity. Rides only
   * @type {number}
   * @memberof SummaryActivity
   */
  kilojoules?: number;
  /**
   * Average power output in watts during this activity. Rides only
   * @type {number}
   * @memberof SummaryActivity
   */
  averageWatts?: number;
  /**
   * Whether the watts are from a power meter, false if estimated
   * @type {boolean}
   * @memberof SummaryActivity
   */
  deviceWatts?: boolean;
  /**
   * Rides with power meter data only
   * @type {number}
   * @memberof SummaryActivity
   */
  maxWatts?: number;
  /**
   * Similar to Normalized Power. Rides with power meter data only
   * @type {number}
   * @memberof SummaryActivity
   */
  weightedAverageWatts?: number;
}
