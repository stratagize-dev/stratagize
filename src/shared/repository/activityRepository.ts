import { db, StravaGoalsClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { Activity, SportType } from '@/shared/types/Activity';
import { getAuthDetails } from '@/shared/auth';

const getActivitiesForAthlete =
  (stravaGoalsClient: StravaGoalsClient) =>
  (athleteId: number, sportType?: SportType) =>
    performOperationAndLogError(async () => {
      let query = stravaGoalsClient
        .from('activities')
        .select('*')
        .eq('athlete_id', athleteId);

      if (sportType) query = query.eq('sport_type', sportType);

      return query.returns<Activity.Row[]>();
    }, `an error occured retrieving the activities for the athlete ${athleteId}`);

const deleteActivity =
  (stravaGoalsClient: StravaGoalsClient) => (activityId: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient.from('activities').delete().eq('id', activityId),
      'an error occured retrieving the athlete'
    );

const upsert =
  (stravaGoalsClient: StravaGoalsClient) => (activities: Activity.Insert[]) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .upsert<Activity.Insert>(activities)
          .select(),
      'an error occured updating the activities'
    );

const insert =
  (stravaGoalsClient: StravaGoalsClient) => (activity: Activity.Insert) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .insert<Activity.Insert>(activity)
          .select(),
      'an error occured inserting the activity'
    );

const update =
  (stravaGoalsClient: StravaGoalsClient) => (activity: Activity.Update) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .update<Activity.Update>(activity)
          .select(),
      'an error occured updating the activity'
    );

export const createActivityRepository = async (client?: StravaGoalsClient) => {
  if (client === undefined) {
    const {supabaseToken} = await getAuthDetails();
    client = db(supabaseToken);
  }

  return {
    getActivitiesForAthlete: getActivitiesForAthlete(client),
    delete: deleteActivity(client),
    update: update(client),
    upsert: upsert(client),
    insert: insert(client)
  };
};
