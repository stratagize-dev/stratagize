import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import CustomSession from '@/shared/types/auth/CustomSession';
import { db } from '@/shared/db';

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
      onboarding_status: 'not-started',
      refresh_token: customSession.refreshToken
    });
  }
};

const sessionService = {
  beginSession
};

export default sessionService;
