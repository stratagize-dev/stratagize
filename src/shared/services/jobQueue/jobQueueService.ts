import { StratagizeClient } from '@/shared/db';
import { JobQueue, JobStatus } from '@/shared/types/JobQueue';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { Activity } from '@/shared/types/Activity';
import { addHours } from 'date-fns';
import { createFinalizeAthleteOnboardingJob } from '@/shared/services/jobQueue/createFinalizeAthleteOnboardingJob';
import {
  loadDetailedActivityJob,
  onboardAthleteJob as jobSettings
} from '@/shared/services/jobQueue/jobs';

/**
 * @deprecated
 * @param athleteId
 * @param client
 */
async function createOnboardingJob(
  athleteId: number,
  client: StratagizeClient | undefined
) {
  const jobsRepository = await createJobQueueRepository(client);

  // delete any existing jobs..
  await jobsRepository.deleteForAthlete(athleteId);

  const jobKey = jobSettings.createJobKey(athleteId);

  const { data } = await jobsRepository.findByJobKey(jobKey);

  if (data?.length === 0) {
    const job: JobQueue.Insert[] = [
      {
        http_verb: 'POST',
        url_path: jobSettings.url,
        payload: { athleteId: athleteId },
        job_key: jobKey,
        job_name: jobSettings.name,
        athlete_id: athleteId
      }
    ];

    return jobsRepository.upsert(job);
  }
}

async function createLoadDetailedActivitiesJob(
  activities: Activity.Insert[],
  client: StratagizeClient | undefined
) {
  const jobs: JobQueue.Insert[] = activities.map(activity => ({
    http_verb: 'POST',
    url_path: loadDetailedActivityJob.url,
    payload: activity,
    job_key: loadDetailedActivityJob.createJobKey(activity.id),
    job_name: loadDetailedActivityJob.name,
    athlete_id: activity.athlete_id
  }));

  const jobsRepository = await createJobQueueRepository(client);

  return jobsRepository.upsert(jobs);
}

async function updateJobStatus(
  jobId: number,
  status: JobStatus,
  client: StratagizeClient | undefined
) {
  const jobUpdated: JobQueue.Update = {
    job_id: jobId,
    status: status
  };

  const jobsRepository = await createJobQueueRepository(client);
  return jobsRepository.update(jobUpdated);
}

async function retryJob(jobId: number, client: StratagizeClient | undefined) {
  const jobsRepository = await createJobQueueRepository(client);

  const { data: job } = await jobsRepository.getById(jobId);

  if (job) {
    let jobUpdated: JobQueue.Update;
    if (job.retry_count < job.retry_limit) {
      const delayHours = Math.pow(2, job.retry_count);
      const newJobTime = addHours(new Date(), delayHours);
      jobUpdated = {
        job_id: jobId,
        retry_count: job.retry_count + 1,
        status: 'retry',
        job_time: newJobTime.toISOString()
      };
    } else {
      jobUpdated = {
        job_id: jobId,
        status: 'failed'
      };
    }

    await jobsRepository.update(jobUpdated);
  } else {
    throw new Error(`invalid job id: ${jobId}`);
  }
}

export const jobQueueService = (client?: StratagizeClient) => {
  return {
    /** @deprecated remove and replace with inngest function **/
    createOnboardingJob: (athleteId: number) =>
      createOnboardingJob(athleteId, client),
    createLoadDetailedActivitiesJob: (activities: Activity.Insert[]) =>
      createLoadDetailedActivitiesJob(activities, client),
    createFinalizeAthleteOnboardingJob: (athleteId: number) =>
      createFinalizeAthleteOnboardingJob(athleteId, client),
    beginProcessingJob: (jobId: number) =>
      updateJobStatus(jobId, 'processing', client),
    completeJob: (jobId: number) => updateJobStatus(jobId, 'complete', client),
    retryJob: (jobId: number) => retryJob(jobId, client)
  };
};
