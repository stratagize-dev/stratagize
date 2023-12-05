import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import { Athlete } from '@/shared/types/Athlete';
import CustomSession from '@/shared/types/auth/CustomSession';
import { db } from '@/shared/db';

import { jobQueueService } from '@/shared/services/jobQueue';

export async function onboardAthlete(athlete: Athlete.Row) {
  return jobQueueService().createOnboardingJob(athlete.id);
}

const beginSession = async (
  athleteId: number,
  customSession: CustomSession
) => {
  const client = db(customSession.supabaseToken);
  const athleteRepository = await createAthletesRepository(client);
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (athlete) {
    await athleteRepository.update(athleteId, {
      refresh_token: customSession.refreshToken
    });
  } else {
    await athleteRepository.insert({
      id: athleteId,
      hour_goal: 365,
      is_onboarded: false,
      refresh_token: customSession.refreshToken
    });
  }
};

const sessionService = {
  beginSession
};

export default sessionService;
