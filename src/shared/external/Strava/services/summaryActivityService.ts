import { startOfYear } from 'date-fns';
import * as StravaApi from '@/shared/strava-client';

export const loadFromFirstOfYear = async (
  accessToken: string | undefined,
  signal: AbortSignal | undefined
) => loadFrom(accessToken, signal, startOfYear(new Date()));

async function loadFrom(
  accessToken: string | undefined,
  signal: AbortSignal | undefined,
  after: Date
) {
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
    }

    return allActivities;
  }

  return [];
}

const summaryActivityService = {
  loadFromFirstOfYear,
  loadFrom
};

/**
 * loads from activities from Strava
 */
export default summaryActivityService;
