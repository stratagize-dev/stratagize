import { StravaGoalsClient } from '@/shared/db';
import { Activity } from '@/shared/types/Activity';
import { mapCommonFields } from '@/shared/services/activityService/mapCommonFields';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import * as StravaApi from '@/shared/strava-client';

export const insertDetailedActivity = async (
  detailedActivity: StravaApi.DetailedActivity,
  client?: StravaGoalsClient
) => {
  const activity: Activity.Insert = {
    athlete_id: detailedActivity.athlete?.id ?? 0,
    id: detailedActivity.id ?? 0,
    ...mapCommonFields(detailedActivity)
  };

  const activityRepository = await createActivityRepository(client);
  return activityRepository.upsert([activity]);
};
