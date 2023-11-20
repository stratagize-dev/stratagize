import { SportType } from '@/shared/types/Activity';
import { StravaGoalsClient } from '@/shared/db';
import { createActivityRepository } from '@/shared/repository/activityRepository';

export const getActivitiesForAthlete = async (
  athleteId: number,
  sportType?: SportType,
  client?: StravaGoalsClient
) => {
  const activityRepository = await createActivityRepository(client);
  return activityRepository.getActivitiesForAthlete(athleteId, sportType);
};