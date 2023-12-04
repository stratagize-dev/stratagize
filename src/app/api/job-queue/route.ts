import { NextRequest, NextResponse } from 'next/server';
import { ActivitiesApiFp } from '@/shared/strava-client';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { activityService } from '@/shared/services/activityService';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { Activity } from '@/shared/types/Activity';
const batchSize = 60;
export async function POST(request: NextRequest) {
  console.log('running poller');

  const { data, error } = await serviceRoleDb
    .from('job_queue')
    .select('*')
    .eq('status', '')
    .limit(batchSize);

  if (data) {
    const processing = data?.map(job => ({ ...job, status: 'processing' }));
    const jobsRepository = await createJobQueueRepository(serviceRoleDb);

    await jobsRepository.upsert(processing);

    for (const item of data) {
      const summaryActivity = item.payload as Activity.Insert;

      if (summaryActivity) {
        const athleteRepository = await createAthletesRepository(serviceRoleDb);

        const { data: athlete } = await athleteRepository.get(
          summaryActivity.athlete_id
        );

        if (athlete?.refresh_token) {
          const tokenResult = await refreshToken(athlete.refresh_token);

          if (tokenResult.accessToken) {
            const activitiesApi = ActivitiesApiFp({
              accessToken: tokenResult.accessToken
            });

            const detailedActivity = await activitiesApi.getActivityById(
              summaryActivity.id
            )(fetch);

            await activityService(serviceRoleDb).insertDetailedActivity(
              detailedActivity
            );

            const jobUpdated = { ...item, status: 'completed' };

            await jobsRepository.upsert([jobUpdated]);
          }
        }
      }
    }

    console.log(`${data.length} processed`);
  }

  return NextResponse.json({ status: 'ok' });
}
