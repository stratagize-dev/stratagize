import { StratagizeClient } from '@/shared/db';

import {
  createClient,
  performOperationAndLogError
} from '@/shared/repository/utils';

export async function createNotification(
  athleteId: number,
  message: string,
  client?: StratagizeClient
) {
  const stratagizeClient = await createClient(client);

  return performOperationAndLogError(async () => {
    return stratagizeClient
      .from('notifications')
      .insert({ athlete_id: athleteId, message: message });
  }, 'an error occured finding the jobs');
}

export const notification = (client?: StratagizeClient) => {
  return {
    createNotification: (athleteId: number, message: string) =>
      createNotification(athleteId, message, client)
  };
};
