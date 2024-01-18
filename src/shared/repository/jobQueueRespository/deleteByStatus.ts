import { StratagizeClient } from '@/shared/db';
import { JobStatus } from '@/shared/types/JobQueue';
import { performOperationAndLogError } from '@/shared/repository/utils';

export const deleteByStatus =
  (stravaGoalsClient: StratagizeClient) => (status: JobStatus) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .delete()
          .eq('status', status)
          .select(),
      'an error occured deleting the jobs'
    );
