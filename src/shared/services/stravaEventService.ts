import { db } from '@/shared/db';
import { StravaEvent } from '@/shared/types/StravaEvent';
import { logDatabaseError } from '@/shared/error';

const insert = async (event: StravaEvent.Insert) => {
  const { error } = await db.from('strava_events').insert([event]).select();

  logDatabaseError('error inserting strava event', error);
};
export const stravaEventService = () => {
  return { insert };
};
