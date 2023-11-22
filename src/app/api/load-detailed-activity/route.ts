import { NextRequest, NextResponse } from 'next/server';
import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';

import { Activity } from '@/shared/types/Activity';
interface WebhookPayload {
  type: 'INSERT';
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

  console.log(`loading details ${data}`);
  // const dataString = data.record.data?.toString();

  // if (dataString) {
  //   const stravaEvent: StravaEvent = JSON.parse(dataString);
  //   await handleActivityStravaEvent(stravaEvent);
  // }

  return NextResponse.json({ status: 'ok', data });
}
