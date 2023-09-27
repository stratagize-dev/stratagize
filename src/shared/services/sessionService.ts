import { logDatabaseError } from '@/shared/error';
import athleteRepository from '@/shared/repository/athleteRepository';
import summaryActivityService from '@/shared/external/Strava/services/summaryActivityService';
import { getServerCustomSession } from '@/shared/auth';
import { activityService } from '@/shared/services/activityService';
import { Athlete } from '@/shared/types/Athlete';

async function onboardAthlete(athlete: Athlete.Row) {
  const authToken = await getServerCustomSession();

  console.log('beginning onboarding of athlete', authToken?.athleteId);

  const summaryActivities = await summaryActivityService.loadFromFirstOfYear(
    authToken?.accessToken,
    undefined
  );

  const { error } = await activityService().saveSummaryActivities(
    summaryActivities
  );

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

const beginSession = async (athleteId: number, refreshToken: string) => {
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (athlete) {
    const { error } = await athleteRepository.update(athleteId, {
      refresh_token: refreshToken
    });

    if (athlete.is_onboarded === false) {
      // await onboardAthlete(athlete);
    }

    logDatabaseError('error updating refresh token', error);
  } else {
    const { error, data: athlete } = await athleteRepository.insert({
      id: athleteId,
      hour_goal: 365,
      is_onboarded: false,
      refresh_token: refreshToken
    });

    logDatabaseError('error inserting athlete', error);

    if (athlete !== null) {
      // await onboardAthlete(athlete[0]);
    }
  }
};

const sessionService = {
  beginSession
};

export default sessionService;
