import { StratagizeClient } from '@/shared/db';
import { performOperationAndLogError } from '@/shared/repository/utils';
import { JobName } from '@/shared/services/jobQueue/jobs';

export const findAllByJobNameAndAthleteId =
  (stravaGoalsClient: StratagizeClient) =>
  (jobName: JobName, athleteId: number) =>
    performOperationAndLogError(async () => {
      return stravaGoalsClient
        .from('job_queue')
        .select('*')
        .order('job_id', { ascending: true })
        .eq('job_name', jobName)
        .eq('athlete_id', athleteId);
    }, 'an error occured finding the jobs');
