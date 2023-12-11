import { StratagizeClient } from '@/shared/db';
import { OnboardAthletePayload } from '@/app/api/job-handler/onboard-athlete/route';
import { JobQueue } from '@/shared/types/JobQueue';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { Activity } from '@/shared/types/Activity';
import { getApiBaseUrl } from '@/shared/url';
import { addHours } from 'date-fns';

async function createOnboardingJob(
  athleteId: number,
  client: StratagizeClient | undefined
) {
  const jobsRepository = await createJobQueueRepository(client);
  const jobKey = `onboard-athlete-${athleteId}`;

  const { data } = await jobsRepository.findByJobKey(jobKey);

  if (data?.length === 0) {
    const payload: OnboardAthletePayload = { athleteId: athleteId };
    const job: JobQueue.Insert[] = [
      {
        http_verb: 'POST',
        url_path: `${getApiBaseUrl()}/job-handler/onboard-athlete`,
        payload: JSON.stringify(payload),
        job_key: `onboard-athlete-${athleteId}`
      }
    ];

    return jobsRepository.upsert(job);
  }
}

async function createLoadDetailedActivityJob(
  activities: Activity.Insert[],
  client: StratagizeClient | undefined
) {
  const jobs: JobQueue.Insert[] = activities.map(activity => ({
    http_verb: 'POST',
    url_path: `${getApiBaseUrl()}/job-handler/load-detailed-activity`,
    payload: activity,
    job_key: `load-detailed-activity-${activity.id}`
  }));

  const jobsRepository = await createJobQueueRepository(client);

  return jobsRepository.upsert(jobs);
}

async function completeJob(
  jobId: number,
  client: StratagizeClient | undefined
) {
  const jobUpdated: JobQueue.Update = {
    job_id: jobId,
    status: 'complete'
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
    createOnboardingJob: (athleteId: number) =>
      createOnboardingJob(athleteId, client),
    createLoadDetailedActivityJob: (activities: Activity.Insert[]) =>
      createLoadDetailedActivityJob(activities, client),
    completeJob: (jobId: number) => completeJob(jobId, client),
    retryJob: (jobId: number) => retryJob(jobId, client)
  };
};
