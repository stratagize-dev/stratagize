import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { getAthlete } from '@/shared/services/athleteService';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { logDatabaseError } from '@/shared/error';
import { activityService } from '@/shared/services/activityService';
import { ActivitiesApiFp } from '@/shared/strava-client';

async function createNewActivity(activityEvent: StravaEvent) {
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

      await activityService().insertDetailedActivity(detailedActivity);
    }
  }

  // TODO: Implement
}

function updateExistingActivity(activityEvent: StravaEvent) {}

// function deleteActivity(activityEvent: StravaEvent) {
//   return db
//     .from('activities')
//     .delete()
//     .eq('id', activityEvent.object_id)
//     .eq('athlete_id', activityEvent.owner_id);
// }

async function handleActivityStravaEvent(activityEvent: StravaEvent) {
  // switch (activityEvent.aspect_type) {
  //   case 'create':
  //     await createNewActivity(activityEvent);
  //   case 'update':
  //     updateExistingActivity(activityEvent);
  //   case 'delete':
  //     const { error } = await activityService().deleteActivity(
  //       activityEvent.object_id
  //     );
  //     logDatabaseError('error deleting activity', error);
  // }
}

export async function handleStravaEvent(event: StravaEvent) {
  if (event.object_type === 'activity') {
    console.debug('new event received', { event });
    await handleActivityStravaEvent(event);
  }
}
