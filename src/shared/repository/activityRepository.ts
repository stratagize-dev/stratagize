import { db, StratagizeClient } from '@/shared/db';
import {
  createClient,
  performOperationAndLogError
} from '@/shared/repository/utils';
import { Activity, SportType } from '@/shared/types/Activity';

const getActivitiesForAthlete =
  (stravaGoalsClient: StratagizeClient) =>
  (athleteId: number, sportType?: SportType) =>
    performOperationAndLogError(async () => {
      let query = stravaGoalsClient
        .from('activities')
        .select('*')
        .order('start_date', { ascending: true })
        .eq('athlete_id', athleteId);

      if (sportType) query = query.eq('sport_type', sportType);

      return query.returns<Activity.Row[]>();
    }, `an error occured retrieving the activities for the athlete ${athleteId}`);

const deleteActivity =
  (stravaGoalsClient: StratagizeClient) => (activityId: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient.from('activities').delete().eq('id', activityId),
      'an error occured retrieving the athlete'
    );

const upsert =
  (stravaGoalsClient: StratagizeClient) => (activities: Activity.Insert[]) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .upsert<Activity.Insert>(activities)
          .select(),
      'an error occured updating the activities'
    );

const insert =
  (stravaGoalsClient: StratagizeClient) => (activity: Activity.Insert) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .insert<Activity.Insert>(activity)
          .select(),
      'an error occured inserting the activity'
    );

const update =
  (stravaGoalsClient: StratagizeClient) => (activity: Activity.Update) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .update<Activity.Update>(activity)
          .select(),
      'an error occured updating the activity'
    );

export const createActivityRepository = async (client?: StratagizeClient) => {
  client = await createClient(client);

  return {
    getActivitiesForAthlete: getActivitiesForAthlete(client),
    delete: deleteActivity(client),
    update: update(client),
    upsert: upsert(client),
    insert: insert(client)
  };
};
