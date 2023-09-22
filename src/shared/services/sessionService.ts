import { logDatabaseError } from '@/shared/error';
import athleteRepository from '@/shared/repository/athleteRepository';
import summaryActivityService from '@/shared/external/Strava/services/summaryActivityService';
import { getServerCustomSession } from '@/shared/auth';
import { activityService } from '@/shared/services/activityService';

const beginSession = async (athleteId: number, refreshToken: string) => {
  const { data: athlete } = await athleteRepository.get(athleteId);

  if (athlete) {
    const { error } = await athleteRepository.update(athleteId, {
      refresh_token: refreshToken
    });

    logDatabaseError('error updating refresh token', error);
  } else {
    const { error } = await athleteRepository.insert({
      id: athleteId,
      hour_goal: 365,
      is_onboarded: false,
      refresh_token: refreshToken
    });

    logDatabaseError('error inserting athlete', error);

    const authToken = await getServerCustomSession();

    const summaryActivities = await summaryActivityService.loadFromFirstOfYear(
      authToken?.accessToken,
      undefined
    );

    const { error: activityServiceError } =
      await activityService().saveSummaryActivities(summaryActivities);

    console.debug(
      'sessionService.beginService',
      `summary activities loaded ${summaryActivities.length} records`
    );

    logDatabaseError('error saving activities', activityServiceError);
  }
};

const sessionService = {
  beginSession
};

export default sessionService;
