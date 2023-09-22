import { NextRequest, NextResponse } from 'next/server';
import { StravaEvent } from '@/shared/types/strava/events/StravaEvent';
import { handleStravaEvent } from '@/shared/stravaEventHandler';

export async function POST(request: NextRequest) {
  try {
    const stravaEvent = (await request.json()) as StravaEvent;

    await handleStravaEvent(stravaEvent);
    return NextResponse.json('success');
  } catch (e) {
    console.error('stuart', e);
    return NextResponse.json(JSON.stringify(e));
  }
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const verifyToken = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const mode = searchParams.get('hub.mode');

  console.debug('stuart', { searchParams });
  return NextResponse.json({ 'hub.challenge': challenge });
}
