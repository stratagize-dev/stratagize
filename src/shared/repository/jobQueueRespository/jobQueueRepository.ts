import { StravaGoalsClient } from '@/shared/db';
import { createClient } from '@/shared/repository/utils';
import { upsert } from '@/shared/repository/jobQueueRespository/upsert';
import { update } from '@/shared/repository/jobQueueRespository/update';

export const createJobQueueRepository = async (client?: StravaGoalsClient) => {
  client = await createClient(client);

  return {
    upsert: upsert(client),
    update: update(client)
  };
};
