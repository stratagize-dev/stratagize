import {
  athleteRepository,
  createAthletesRepository
} from '@/shared/repository/athleteRepository';
import summaryActivityService from '@/shared/external/Strava/services/summaryActivityService';
import { activityService } from '@/shared/services/activityService';
import { Athlete } from '@/shared/types/Athlete';
import CustomSession from '@/shared/types/auth/CustomSession';

export async function onboardAthlete(
  athlete: Athlete.Row,
  customSession: CustomSession
) {
  console.log('beginning onboarding of athlete', athlete.id);

  const summaryActivities = await summaryActivityService.loadFromFirstOfYear(
    customSession.accessToken,
    undefined
  );

  const { error } = await activityService.saveSummaryActivities(
    summaryActivities
  );

  const athleteRepository = await createAthletesRepository();
  if (error === null) {
    await athleteRepository.update(athlete.id, {
      ...athlete,
      is_onboarded: true
    });
  }

  console.log('sessionService.onboardAthlete completed', {
    athleteId: athlete.id,
    activityCount: summaryActivities.length
  });
}

const beginSession = async (
  athleteId: number,
  customSession: CustomSession
) => {
  const { data: athlete } = await athleteRepository.get(
    customSession.supabaseToken
  )(athleteId);

  if (athlete) {
    await athleteRepository.update(customSession.supabaseToken)(athleteId, {
      refresh_token: customSession.refreshToken
    });
  } else {
    await athleteRepository.insert(customSession.supabaseToken)({
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
