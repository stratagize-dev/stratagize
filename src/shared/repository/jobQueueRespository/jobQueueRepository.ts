import { StravaGoalsClient } from '@/shared/db';
import { createClient } from '@/shared/repository/utils';
import { upsert } from '@/shared/repository/jobQueueRespository/upsert';
import { update } from '@/shared/repository/jobQueueRespository/update';
import { findByStatus } from '@/shared/repository/jobQueueRespository/findByStatus';

export const createJobQueueRepository = async (client?: StravaGoalsClient) => {
  client = await createClient(client);

  return {
    findByStatus: findByStatus(client),
    upsert: upsert(client),
    update: update(client)
  };
};
