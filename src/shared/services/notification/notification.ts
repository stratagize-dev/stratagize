import { StratagizeClient } from '@/shared/db';

import {
  createClient,
  performOperationAndLogError
} from '@/shared/repository/utils';
import { Database } from '../../../../database.types';

export async function createNotification(
  athleteId: number,
  message: string,
  type?: Database['public']['Enums']['notification_type'],
  client?: StratagizeClient
) {
  const stratagizeClient = await createClient(client);

  return performOperationAndLogError(async () => {
    return stratagizeClient
      .from('notifications')
      .insert({ athlete_id: athleteId, message: message, type: type });
  }, 'an error occured finding the jobs');
}

export const notification = (client?: StratagizeClient) => {
  return {
    createNotification: (
      athleteId: number,
      message: string,
      type?: Database['public']['Enums']['notification_type']
    ) => createNotification(athleteId, message, type, client)
  };
};
