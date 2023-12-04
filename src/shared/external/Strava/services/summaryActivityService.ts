import { startOfYear } from 'date-fns';
import * as StravaApi from '@/shared/strava-client';
import logError from '@/shared/logging/logError';

export const loadFromFirstOfYear = async (accessToken: string | undefined) =>
  loadFrom(accessToken, startOfYear(new Date()));

async function loadFrom(accessToken: string | undefined, after: Date) {
  if (!accessToken) return [];

  if (accessToken) {
    const activitiesApi = StravaApi.ActivitiesApiFp({
      accessToken: accessToken
    });

    let allActivities: StravaApi.SummaryActivity[] = [];
    let page = 1;
    let perPage = 100;
    let totalRecords = perPage;

    while (totalRecords === perPage) {
      try {
        const activities = await activitiesApi.getLoggedInAthleteActivities(
          undefined,
          after.getTime() / 1000,
          page,
          perPage
        )();

        allActivities = allActivities.concat(
          activities.filter(
            x =>
              x.id !== undefined &&
              x.athlete?.id !== undefined &&
              x.start_date !== undefined
          )
        );

        totalRecords = activities.length;
        page++;
      } catch (e) {
        logError(
          'an error occurred retrieving summary activities for athlete',
          e
        );
      }
    }

    return allActivities;
  }

  return [];
}

const summaryActivityService = {
  loadFromFirstOfYear
};

/**
 * loads from activities from Strava
 */
export default summaryActivityService;
