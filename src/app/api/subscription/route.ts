import { NextRequest, NextResponse } from 'next/server';
import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { handleStravaEvent } from '@/shared/stravaEventHandler';
import { Config } from '@/shared/config';

/**
 * Endpoint called by Strava with new events
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  try {
    const stravaEvent = (await request.json()) as StravaEvent;

    if (stravaEvent.subscription_id !== Config.stravaSubscriptionId) {
      return new NextResponse('Invalid Request', { status: 500 });
    }
    await handleStravaEvent(stravaEvent);
    return NextResponse.json('success');
  } catch (e) {
    console.error('stuart', e);
    return NextResponse.json(JSON.stringify(e));
  }
}

/**
 * Endpoint called by Strava to validate the subscription request
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');

  if (mode !== 'subscribe') {
    return new NextResponse('Invalid Request - hub.mode', { status: 500 });
  }

  const verifyToken = searchParams.get('hub.verify_token');

  if (verifyToken !== Config.stravaVerificationToken) {
    return new NextResponse('Invalid Request - hub.verify_token', {
      status: 500
    });
  }

  const challenge = searchParams.get('hub.challenge');

  return NextResponse.json({ 'hub.challenge': challenge });
}
