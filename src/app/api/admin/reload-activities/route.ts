import {  NextResponse } from 'next/server';
import { getAuthDetails } from '@/shared/auth';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { onboardAthlete } from '@/shared/services/sessionService';

export async function POST() {

  const {athleteId, session} = await getAuthDetails();

  const athleteRepository = await createAthletesRepository();
  const { data: athlete } = await athleteRepository.get(athleteId);

  if(athlete)
  {

    await athleteRepository.update(athleteId, {is_onboarded: false})

    await onboardAthlete(athlete, session);

    return NextResponse.json('success');
  }
  else{
    return NextResponse.error()
  }

}