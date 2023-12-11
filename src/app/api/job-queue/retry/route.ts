import { NextResponse } from 'next/server';

export async function POST() {
  console.log('retrying failed jobs');
  return NextResponse.json({ status: 'ok' });
}
