import { StratagizeClient } from '@/shared/db';
import { createClient } from '@/shared/repository/utils';
import { upsert } from '@/shared/repository/jobQueueRespository/upsert';
import { update } from '@/shared/repository/jobQueueRespository/update';
import { findByStatus } from '@/shared/repository/jobQueueRespository/findByStatus';
import { findByJobKey } from '@/shared/repository/jobQueueRespository/findByJobKey';
import { getById } from '@/shared/repository/jobQueueRespository/getById';

export const createJobQueueRepository = async (client?: StratagizeClient) => {
  client = await createClient(client);

  return {
    getById: getById(client),
    findByJobKey: findByJobKey(client),
    findByStatus: findByStatus(client),
    upsert: upsert(client),
    update: update(client)
  };
};
