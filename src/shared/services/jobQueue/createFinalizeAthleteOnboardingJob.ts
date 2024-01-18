import { StratagizeClient } from '@/shared/db';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { JobQueue } from '@/shared/types/JobQueue';
import { finalizeAthleteOnboardingJob } from '@/shared/services/jobQueue/jobs';

export async function createFinalizeAthleteOnboardingJob(
  athleteId: number,
  client: StratagizeClient | undefined
) {
  const jobsRepository = await createJobQueueRepository(client);
  const jobKey = finalizeAthleteOnboardingJob.createJobKey(athleteId);

  const { data } = await jobsRepository.findByJobKey(jobKey);

  if (data?.length === 0) {
    const job: JobQueue.Insert[] = [
      {
        http_verb: 'POST',
        url_path: finalizeAthleteOnboardingJob.url,
        payload: { athleteId: athleteId },
        job_key: jobKey,
        job_name: finalizeAthleteOnboardingJob.name,
        athlete_id: athleteId
      }
    ];

    return jobsRepository.upsert(job);
  }
}
