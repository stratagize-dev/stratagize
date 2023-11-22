import { NextRequest, NextResponse } from 'next/server';
import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { ActivitiesApiFp } from '@/shared/strava-client';
import { Activity } from '@/shared/types/Activity';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { activityService } from '@/shared/services/activityService';
import serviceRoleDb from '@/shared/serviceRoleDb';
interface WebhookPayload {
  type: 'INSERT' | 'UPDATE';
  table: 'activities';
  record: Activity.Row;
  schema: 'public';
  old_record: StravaEvent | null;
}

/**
 * Endpoint called from by Supabase in response to insert of new StravaEvent
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  const data: WebhookPayload = await request.json();

  console.log(`loading details ${JSON.stringify(data)}`);

  const athleteRepository = await createAthletesRepository(serviceRoleDb);

  const { data: athlete } = await athleteRepository.get(data.record.athlete_id);

  if (athlete?.refresh_token) {
    const tokenResult = await refreshToken(athlete.refresh_token);

    if (tokenResult.accessToken) {
      const activitiesApi = ActivitiesApiFp({
        accessToken: tokenResult.accessToken
      });

      const detailedActivity = await activitiesApi.getActivityById(
        data.record.id
      )(fetch);

      await activityService(serviceRoleDb).insertDetailedActivity(
        detailedActivity
      );
    }
  }

  return NextResponse.json({ status: 'ok', data });
}
