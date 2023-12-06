import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';

export const findByJobKey =
  (stravaGoalsClient: StratagizeClient) => (jobKey: string) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient.from('job_queue').select('*').eq('job_key', jobKey),
      'an error occured finding job'
    );
