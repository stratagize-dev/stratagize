import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { JobQueue } from '@/shared/types/JobQueue';

export const upsert =
  (stravaGoalsClient: StratagizeClient) => (jobs: JobQueue.Insert[]) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .upsert<JobQueue.Insert>(jobs)
          .select(),
      'an error occured updating the jobs'
    );
