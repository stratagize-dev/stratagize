import { StratagizeClient } from '@/shared/db';
import { JobStatus } from '@/shared/types/JobQueue';
import { performOperationAndLogError } from '@/shared/repository/utils';

export const findByStatusAndDate =
  (stravaGoalsClient: StratagizeClient) =>
  (jobStatus: JobStatus, date: Date, limit: number) =>
    performOperationAndLogError(async () => {
      return stravaGoalsClient
        .from('job_queue')
        .select('*')
        .order('job_id', { ascending: true })
        .eq('status', jobStatus)
        .gte('job_time', date.toISOString())
        .limit(limit);
    }, 'an error occured finding job');
