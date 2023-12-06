import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';

export const getById =
  (stravaGoalsClient: StratagizeClient) => (jobId: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .select('*')
          .eq('job_id', jobId)
          .single(),
      'an error occured finding job'
    );
