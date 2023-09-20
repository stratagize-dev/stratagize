import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { getAthlete } from '@/shared/services/athleteService';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { logDatabaseError } from '@/shared/error';
import { activityService } from '@/shared/services/activityService';
import { ActivitiesApiFp, DetailedActivity } from '@/shared/strava-client';

async function upsertActivity(
  activityEvent: StravaEvent,
  operation: (activity: DetailedActivity) => Promise<void>
) {
  const { data: athlete } = await getAthlete(activityEvent.owner_id);

  if (athlete?.refresh_token) {
    const tokenResult = await refreshToken(athlete.refresh_token);

    if (tokenResult.accessToken) {
      const activitiesApi = ActivitiesApiFp({
        accessToken: tokenResult.accessToken
      });

      const detailedActivity = await activitiesApi.getActivityById(
        activityEvent.object_id
      )(fetch);

      return operation(detailedActivity);
    }
  }

  // TODO: Implement something if
}

const createNewActivity = async (activityEvent: StravaEvent) =>
  upsertActivity(activityEvent, async activity => {
    await activityService().insertDetailedActivity(activity);
  });

const updateExistingActivity = async (activityEvent: StravaEvent) =>
  upsertActivity(activityEvent, async activity => {
    await activityService().updateDetailedActivity(activity);
  });

async function handleActivityStravaEvent(activityEvent: StravaEvent) {
  switch (activityEvent.aspect_type) {
    case 'create':
      return createNewActivity(activityEvent);
    case 'update':
      return updateExistingActivity(activityEvent);
    case 'delete':
      const { error } = await activityService().deleteActivity(
        activityEvent.object_id
      );
      logDatabaseError('error deleting activity', error);
  }
}

export async function handleStravaEvent(event: StravaEvent) {
  if (event.object_type === 'activity') {
    // console.debug('new event received', { event });
    //
    // await stravaEventService().insert({
    //   data: JSON.stringify(event),
    //   is_processed: false
    // });
    return handleActivityStravaEvent(event);
  }
}
