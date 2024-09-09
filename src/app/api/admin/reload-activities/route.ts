import { NextResponse } from 'next/server';
import { getAuthDetails } from '@/shared/auth';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';

export async function POST() {
  const { athleteId } = await getAuthDetails();

  const athleteRepository = await createAthletesRepository();
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (athlete) {
    await athleteRepository.update(athleteId, { is_onboarded: false });

    return NextResponse.json('success');
  } else {
    return NextResponse.error();
  }
}
