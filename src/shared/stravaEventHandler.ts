import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { stravaEventService } from '@/shared/services/stravaEventService';

export async function handleStravaEvent(event: StravaEvent) {
  if (event.object_type === 'activity') {
    await stravaEventService().insert({
      data: JSON.stringify(event),
      is_processed: false
    });
  }
}
