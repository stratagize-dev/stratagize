import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.debug('strava event route', { data });

  return NextResponse.json({ status: 'ok', data });
}
