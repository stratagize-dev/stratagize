import { StravaGoalsClient } from '@/shared/db';
import { createClient } from '@/shared/repository/utils';
import { upsert } from '@/shared/repository/jobQueueRespository/upsert';

export const createJobQueueRepository = async (client?: StravaGoalsClient) => {
  client = await createClient(client);

  return {
    upsert: upsert(client)
  };
};
