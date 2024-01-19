import { NextRequest, NextResponse } from 'next/server';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { activityService } from '@/shared/services/activityService';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { JobHandlerPayload } from '@/app/api/job-handler/types';
import logError from '@/shared/logging/logError';
import summaryActivityService from '@/shared/external/Strava/services/summaryActivityService';
import { jobQueueService } from '@/shared/services/jobQueue';
import { notification } from '@/shared/services/notification/notification';
export interface OnboardAthletePayload {
  athleteId: number;
}
export async function POST(request: NextRequest) {
  const data: JobHandlerPayload<OnboardAthletePayload> = await request.json();
  const athleteId = data.payload.athleteId;
  console.log('starting onboard athlete job');

  const jobQueue = jobQueueService(serviceRoleDb);
  try {
    await jobQueue.beginProcessingJob(data.jobId);

    const athleteRepository = await createAthletesRepository(serviceRoleDb);

    const { data: athlete } = await athleteRepository.get(athleteId);

    if (athlete?.refresh_token) {
      const tokenResult = await refreshToken(athlete.refresh_token);

      if (!tokenResult.accessToken) {
        throw new Error('unable to get refresh token');
      }
      console.log('onboarding athlete', athleteId);

      const summaryActivities =
        await summaryActivityService.loadFromFirstOfYear(
          tokenResult.accessToken
        );
      console.log(
        `onboarding athlete: ${summaryActivities.length} activities found`
      );

      const { error, data: savedActivities } =
        await activityService(serviceRoleDb).saveSummaryActivities(
          summaryActivities
        );

      if (savedActivities) {
        await jobQueue.createLoadDetailedActivitiesJob(savedActivities);

        await jobQueue.createFinalizeAthleteOnboardingJob(athleteId);
      }

      if (error !== null) {
        throw error;
      }

      await athleteRepository.update(athlete.id, {
        ...athlete,
        is_onboarded: true,
        onboarding_status: 'partially-complete'
      });

      const notificationService = notification(serviceRoleDb);

      await notificationService.createNotification(
        athleteId,
        'Onboarding has partially completed'
      );

      await jobQueue.completeJob(data.jobId);

      return NextResponse.json({
        status: 'ok',
        athleteId,
        message: 'athlete successfully onboarded'
      });
    }
  } catch (e) {
    await jobQueue.retryJob(data.jobId);
    logError('unable to onboard athlete', e);
    return NextResponse.error();
  }
}
