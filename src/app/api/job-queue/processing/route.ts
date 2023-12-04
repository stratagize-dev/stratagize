import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('processing jobs');
  return NextResponse.json({ status: 'ok' });
}
