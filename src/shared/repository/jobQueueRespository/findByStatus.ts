import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { JobStatus } from '@/shared/types/JobQueue';

export const findByStatus =
  (stravaGoalsClient: StratagizeClient) =>
  (jobStatus: JobStatus, limit: number) =>
    performOperationAndLogError(async () => {
      return stravaGoalsClient
        .from('job_queue')
        .select('*')
        .order('job_id', { ascending: true })
        .eq('status', jobStatus)
        .limit(limit);
    }, 'an error occured finding job');

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
