import * as StravaApi from '@/shared/strava-client';
import { Activity, SportType } from '@/shared/types/Activity';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import { StravaGoalsClient } from '@/shared/db';
import { getSportTypesForAthlete } from '@/shared/services/activityService/getSportTypesForAthlete';

const defaultDate = (date?: string) => date ?? new Date().toISOString();

const mapCommonFields = (detailedActivity: StravaApi.DetailedActivity) => ({
  name: detailedActivity.name ?? '',
  moving_time: detailedActivity.moving_time ?? 0,
  sport_type:
    detailedActivity.sport_type !== undefined
      ? (StravaApi.SportType[detailedActivity.sport_type] as SportType)
      : 'Unknown',
  start_date: defaultDate(detailedActivity.start_date),
  start_date_local: defaultDate(detailedActivity.start_date_local),
  detailed_event: JSON.stringify(detailedActivity)
});

const deleteActivity = async (
  activityId: number,
  client?: StravaGoalsClient
) => {
  const activityRepository = await createActivityRepository(client);

  return activityRepository.delete(activityId);
};

const getActivitiesForAthlete = async (
  athleteId: number,
  sportType?: SportType,
  client?: StravaGoalsClient
) => {
  const activityRepository = await createActivityRepository(client);
  return activityRepository.getActivitiesForAthlete(athleteId, sportType);
};

const saveSummaryActivities = async (
  summaryActivities: StravaApi.SummaryActivity[],
  client?: StravaGoalsClient
) => {
  const activities: Activity.Insert[] = summaryActivities.map(value => ({
    athlete_id: value.athlete?.id ?? 0,
    name: value.name ?? '',
    id: value.id ?? 0,
    moving_time: value.moving_time ?? 0,
    sport_type: value.sport_type as unknown as SportType,
    start_date: value.start_date ?? '',
    start_date_local: value.start_date_local
  }));

  const activityRepository = await createActivityRepository(client);

  return activityRepository.upsert(activities);
};

const insertDetailedActivity = async (
  detailedActivity: StravaApi.DetailedActivity,
  client?: StravaGoalsClient
) => {
  const activity: Activity.Insert = {
    athlete_id: detailedActivity.athlete?.id ?? 0,
    id: detailedActivity.id ?? 0,
    ...mapCommonFields(detailedActivity)
  };

  const activityRepository = await createActivityRepository(client);
  return activityRepository.insert(activity);
};

const updateDetailedActivity = async (
  detailedActivity: StravaApi.DetailedActivity,
  client?: StravaGoalsClient
) => {
  if (detailedActivity.id) {
    const activity: Activity.Update = {
      ...mapCommonFields(detailedActivity)
    };

    const activityRepository = await createActivityRepository(client);

    return activityRepository.update(activity);
  }
};

export const activityService = (client?: StravaGoalsClient) => {
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
