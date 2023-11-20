import { StravaGoalsClient } from '@/shared/db';
import { Activity } from '@/shared/types/Activity';
import { mapCommonFields } from '@/shared/services/activityService/mapCommonFields';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import * as StravaApi from '@/shared/strava-client';

export const updateDetailedActivity = async (
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
