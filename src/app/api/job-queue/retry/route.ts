import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('retrying failed jobs');
  return NextResponse.json({ status: 'ok' });
}
