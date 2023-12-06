import * as StravaApi from '@/shared/strava-client';
import { SportType } from '@/shared/types/Activity';
import { StratagizeClient } from '@/shared/db';
import { getSportTypesForAthlete } from '@/shared/services/activityService/getSportTypesForAthlete';
import { deleteActivity } from '@/shared/services/activityService/deleteActivity';
import { getActivitiesForAthlete } from '@/shared/services/activityService/getActivitiesForAthlete';
import { saveSummaryActivities } from '@/shared/services/activityService/saveSummaryActivities';
import { insertDetailedActivity } from '@/shared/services/activityService/insertDetailedActivity';
import { updateDetailedActivity } from '@/shared/services/activityService/updateDetailedActivity';

export const activityService = (client?: StratagizeClient) => {
  return {
    deleteActivity: (activityId: number) => deleteActivity(activityId, client),
    /**
     * Gets all the distinct sport types that an athlete has engaged in
     * @param athleteId
     */
    getSportTypesForAthlete: (athleteId: number) =>
      getSportTypesForAthlete(athleteId, client),
    getActivitiesForAthlete: (athleteId: number, sportType?: SportType) =>
      getActivitiesForAthlete(athleteId, sportType, client),
    saveSummaryActivities: (summaryActivities: StravaApi.SummaryActivity[]) =>
      saveSummaryActivities(summaryActivities, client),
    insertDetailedActivity: (detailedActivity: StravaApi.DetailedActivity) =>
      insertDetailedActivity(detailedActivity, client),
    updateDetailedActivity: (detailedActivity: StravaApi.DetailedActivity) =>
      updateDetailedActivity(detailedActivity, client)
  };
};
