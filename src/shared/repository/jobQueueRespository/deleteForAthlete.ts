import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';

export const deleteForAthlete =
  (stravaGoalsClient: StratagizeClient) => (atheteId: number) =>
    performOperationAndLogError(
      async () =>
        stravaGoalsClient
          .from('job_queue')
          .delete()
          .eq('athlete_id', atheteId)
          .select(),
      'an error occured deleting the jobs'
    );
