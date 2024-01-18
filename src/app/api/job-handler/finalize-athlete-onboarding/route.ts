import { NextRequest, NextResponse } from 'next/server';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { JobHandlerPayload } from '@/app/api/job-handler/types';
import logError from '@/shared/logging/logError';
import { jobQueueService } from '@/shared/services/jobQueue';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { loadDetailedActivityJob } from '@/shared/services/jobQueue/jobs';
import { notification } from '@/shared/services/notification/notification';

export interface FinalizeAthleteOnboardingPayload {
  athleteId: number;
}
export async function POST(request: NextRequest) {
  const jobQueue = jobQueueService(serviceRoleDb);
  const data: JobHandlerPayload<FinalizeAthleteOnboardingPayload> =
    await request.json();
  try {
    const payload = data.payload;
    const athleteId = payload.athleteId;

    const athleteRepository = await createAthletesRepository(serviceRoleDb);
    const jobQueueRepository = await createJobQueueRepository(serviceRoleDb);
    const notificationService = notification(serviceRoleDb);

    const { data: loadDetailedActivityJobs, error } =
      await jobQueueRepository.findAllByJobNameAndAthleteId(
        loadDetailedActivityJob.name,
        athleteId
      );

    if (error === null) {
      if (loadDetailedActivityJobs && loadDetailedActivityJobs.length > 0) {
        await jobQueue.retryJob(data.jobId);

        return NextResponse.json({
          status: 'ok',
          athleteId,
          message: 'unable to complete onboarding process as still loading'
        });
      } else {
        await athleteRepository.update(athleteId, {
          onboarding_status: 'complete'
        });
        await jobQueue.completeJob(data.jobId);

        await notificationService.createNotification(
          athleteId,
          'The onboarding process has been successfully completed'
        );

        return NextResponse.json({
          status: 'ok',
          athleteId,
          message: 'athlete successfully onboarded'
        });
      }
    }
  } catch (e) {
    await jobQueue.retryJob(data.jobId);
    logError('unable to finalize onboarding for athlete', e);
    return NextResponse.error();
  }
}
