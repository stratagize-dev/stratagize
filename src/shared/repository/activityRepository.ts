import { db, StravaGoalsClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { Activity } from '@/shared/types/Activity';
import { getServerCustomSession } from '@/shared/auth';

const getActivitiesForAthlete =
  (stravaGoalsClient: StravaGoalsClient) => (athleteId: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('activities')
          .select('*')
          .eq('athlete_id', athleteId)
          .returns<Activity.Row[]>(),
      `an error occured retrieving the activities for the athlete ${athleteId}`
    );

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

const activityRepository = {
  getActivitiesForAthlete: (supabaseToken: string) =>
    getActivitiesForAthlete(db(supabaseToken)),
  delete: (supabaseToken: string) => deleteActivity(db(supabaseToken)),
  update: (supabaseToken: string) => update(db(supabaseToken)),
  upsert: (supabaseToken: string) => upsert(db(supabaseToken)),
  insert: (supabaseToken: string) => insert(db(supabaseToken))
};
export const createActivityRepository = async () => {
  const session = await getServerCustomSession();
  return {
    getActivitiesForAthlete: activityRepository.getActivitiesForAthlete(
      session.supabaseToken
    ),
    delete: activityRepository.delete(session.supabaseToken),
    update: activityRepository.update(session.supabaseToken),
    upsert: activityRepository.upsert(session.supabaseToken),
    insert: activityRepository.insert(session.supabaseToken)
  };
};
