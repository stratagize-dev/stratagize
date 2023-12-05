import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { JobQueue } from '@/shared/types/JobQueue';

export const update =
  (stravaGoalsClient: StratagizeClient) => (job: JobQueue.Update) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .update<JobQueue.Update>(job)
          .eq('job_id', job.job_id ?? 0)
          .select(),
      'an error occured updating the job'
    );
