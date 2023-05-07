import { MetaActivity } from '@/shared/types/strava/MetaActivity';
import { MetaAthlete } from '@/shared/types/strava/MetaAthlete';
import { ActivityType } from '@/shared/types/strava/ActivityType';
import { SportType } from '@/shared/types/strava/sportType';
import { LatLng } from '@/shared/types/strava/latLng';
import { PolylineMap } from '@/shared/types/strava/PolylineMap';

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
  sportType?: SportType;
  /**
   * The time at which the activity was started.
   * @type {Date}
   * @memberof SummaryActivity
   */
  startDate?: Date;
  /**
   * The time at which the activity was started in the local timezone.
   * @type {Date}
   * @memberof SummaryActivity
   */
  startDateLocal?: Date;
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
