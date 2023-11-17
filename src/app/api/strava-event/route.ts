import { NextRequest, NextResponse } from 'next/server';
import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import { activityService } from '@/shared/services/activityService/activityService';
import { ActivitiesApiFp, DetailedActivity } from '@/shared/strava-client';
import { Database } from '../../../../database.types';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';

import { serviceRoleDb } from '@/shared/serviceRoleDb';
interface WebhookPayload {
  type: 'INSERT';
  table: 'strava_events';
  record: Database['public']['Tables']['strava_events']['Row'];
  schema: 'public';
  old_record: StravaEvent | null;
}

async function upsertActivity(
  activityEvent: StravaEvent,
  operation: (activity: DetailedActivity) => Promise<void>
) {
  const athleteRepository = await createAthletesRepository(serviceRoleDb);
  const { data: athlete } = await athleteRepository.get(activityEvent.owner_id);

  if (athlete?.refresh_token) {
    const tokenResult = await refreshToken(athlete.refresh_token);

    if (tokenResult.accessToken) {
      const activitiesApi = ActivitiesApiFp({
        accessToken: tokenResult.accessToken
      });

      const detailedActivity = await activitiesApi.getActivityById(
        activityEvent.object_id
      )(fetch);

      return operation(detailedActivity);
    }
  }

  // TODO: Implement something if
}

const createNewActivity = async (activityEvent: StravaEvent) =>
  upsertActivity(activityEvent, async activity => {
    await activityService(serviceRoleDb).insertDetailedActivity(activity);
  });

const updateExistingActivity = async (activityEvent: StravaEvent) =>
  upsertActivity(activityEvent, async activity => {
    await activityService(serviceRoleDb).updateDetailedActivity(activity);
  });

async function handleActivityStravaEvent(activityEvent: StravaEvent) {
  switch (activityEvent.aspect_type) {
    case 'create':
      return createNewActivity(activityEvent);
    case 'update':
      return updateExistingActivity(activityEvent);
    case 'delete':
      return activityService(serviceRoleDb).deleteActivity(
        activityEvent.object_id
      );
  }
}

/**
 * Endpoint called from by Supabase in response to insert of new StravaEvent
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  const data: WebhookPayload = await request.json();

  const dataString = data.record.data?.toString();

  if (dataString) {
    const stravaEvent: StravaEvent = JSON.parse(dataString);
    await handleActivityStravaEvent(stravaEvent);
  }

  return NextResponse.json({ status: 'ok', data });
}
