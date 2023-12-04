import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';

import { serviceRoleDb } from '@/shared/serviceRoleDb';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';

export async function handleStravaEvent(event: StravaEvent) {
  if (event.object_type === 'activity') {
    const { error } = await serviceRoleDb
      .from('strava_events')
      .insert([
        {
          data: JSON.stringify(event),
          is_processed: false
        }
      ])
      .select();

    logDatabaseError('error inserting strava event', error);
  }
}
