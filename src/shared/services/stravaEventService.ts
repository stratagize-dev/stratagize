import { db } from '@/shared/db';
import { StravaEvent } from '@/shared/types/StravaEvent';
import { logDatabaseError } from '@/shared/error';

const insert = async (event: StravaEvent.Insert) => {
  //TODO
  const { error } = await db('TODO')
    .from('strava_events')
    .insert([event])
    .select();

  logDatabaseError('error inserting strava event', error);
};
export const stravaEventService = () => {
  return { insert };
};
