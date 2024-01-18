import { NextRequest, NextResponse } from 'next/server';
import { ActivitiesApiFp } from '@/shared/strava-client';
import { Activity } from '@/shared/types/Activity';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { activityService } from '@/shared/services/activityService';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { JobHandlerPayload } from '@/app/api/job-handler/types';
import logError from '@/shared/logging/logError';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { JobQueue } from '@/shared/types/JobQueue';
import { jobQueueService } from '@/shared/services/jobQueue';

export async function POST(request: NextRequest) {
  try {
    const data: JobHandlerPayload<Activity.Row> = await request.json();
    const jobsRepository = await createJobQueueRepository(serviceRoleDb);
    const jobQueue = jobQueueService(serviceRoleDb);

    try {
      if (data.payload.detailed_event) {
        const jobUpdated: JobQueue.Update = {
          job_id: data.jobId,
          status: 'complete'
        };

        await jobsRepository.update(jobUpdated);

        return NextResponse.json({
          status: 'ok',
          activity_id: data.payload.id,
          message: 'skipping activity as detailed event already exists'
        });
      }
      console.log(`loading details ${JSON.stringify(data)}`);

      const athleteRepository = await createAthletesRepository(serviceRoleDb);

      const { data: athlete } = await athleteRepository.get(
        data.payload.athlete_id
      );

      if (athlete?.refresh_token) {
        const tokenResult = await refreshToken(athlete.refresh_token);

        if (tokenResult.accessToken) {
          const activitiesApi = ActivitiesApiFp({
            accessToken: tokenResult.accessToken
          });

          const detailedActivity = await activitiesApi.getActivityById(
            data.payload.id
          )(fetch);

          await activityService(serviceRoleDb).insertDetailedActivity(
            detailedActivity
          );

          const jobUpdated: JobQueue.Update = {
            job_id: data.jobId,
            status: 'complete'
          };

          await jobsRepository.update(jobUpdated);
        }
      }

      return NextResponse.json({
        status: 'ok',
        activity_id: data.payload.id,
        message: 'detailed activity successfully loaded'
      });
    } catch (e) {
      await jobQueue.retryJob(data.jobId);

      logError('an error occured trying to load detailed activity ', e);

      return NextResponse.error();
    }
  } catch (e) {
    logError('an error occured trying to load detailed activity ', e);

    return NextResponse.error();
  }
}
