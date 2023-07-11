import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { fromBeginningOfMonth } from '@/shared/utils';
import { SportType } from '@/shared/types/strava/sportType';

describe('fromBeginningOfMonth', () => {
  it('1 should return activities from the beginning of the current month', () => {
    const activities: ActivitySummary[] = [
      {
        athleteId: 1,
        // resource_state: 2,
        // athlete: {
        //   id: 324132
        //   // resource_state: 1
        // },
        name: 'Afternoon Trail Run',
        // distance: 8974,
        movingTime: 3585,
        // elapsed_time: 3639,
        // total_elevation_gain: 133,
        // type: 'Run',
        sportType: SportType.TrailRun,
        // workout_type: 0,
        id: 8981301507,
        startDate: '2023-04-30T03:33:33Z',
        startDateLocal: '2023-04-30T15:33:33Z'
        // timezone: '(GMT+12:00) Pacific/Auckland',
        // utc_offset: 43200,
        // location_city: null,
        // location_state: null,
        // location_country: 'New Zealand',
        // achievement_count: 0,
        // kudos_count: 6,
        // comment_count: 0,
        // athlete_count: 1,
        // photo_count: 0,
        // trainer: false,
        // commute: false,
        // manual: false,
        // private: false,
        // visibility: 'everyone',
        // flagged: false,
        // gear_id: 'g4354026',
        // start_latlng: [-44.613569620996714, 169.26674994640052],
        // end_latlng: [-44.61358839645982, 169.26687056198716],
        // average_speed: 2.503,
        // max_speed: 3.315,
        // average_cadence: 73.3,
        // average_temp: 26,
        // has_heartrate: true,
        // average_heartrate: 126.9,
        // max_heartrate: 167,
        // heartrate_opt_out: false,
        // display_hide_heartrate_option: true,
        // elev_high: 378.6,
        // elev_low: 332.8,
        // upload_id: 9636114791,
        // upload_id_str: '9636114791',
        // external_id: 'garmin_ping_271768335171',
        // from_accepted_tag: false,
        // pr_count: 0,
        // total_photo_count: 1,
        // has_kudoed: false,
        // suffer_score: 15
      }
    ];
    const result = fromBeginningOfMonth(activities);
    expect(result.length).toBe(0);
  });

  it('should return activities from the beginning of the current month', () => {
    const activities: ActivitySummary[] = [
      {
        name: 'foo',
        athleteId: 1,
        movingTime: 10,
        id: 1,
        startDate: new Date().toISOString()
      },
      {
        name: 'foo',
        athleteId: 1,
        movingTime: 10,
        id: 1,
        startDate: new Date('2022-01-01').toISOString()
      }
    ];
    const result = fromBeginningOfMonth(activities);
    expect(result).toEqual([activities[0]]);
  });
});
