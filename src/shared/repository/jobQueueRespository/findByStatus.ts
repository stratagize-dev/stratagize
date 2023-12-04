import { StravaGoalsClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { JobQueue, JobStatus } from '@/shared/types/JobQueue';
import { batchSize } from '@/app/api/job-queue/constants';

export const findByStatus =
  (stravaGoalsClient: StravaGoalsClient) =>
  (jobStatus: JobStatus, limit: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .select('*')
          .order('job_id', { ascending: true })
          .eq('status', jobStatus)
          .limit(limit),
      'an error occured finding job'
    );
