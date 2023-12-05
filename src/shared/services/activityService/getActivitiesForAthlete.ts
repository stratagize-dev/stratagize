import { SportType } from '@/shared/types/Activity';
import { StratagizeClient } from '@/shared/db';
import { createActivityRepository } from '@/shared/repository/activityRepository';

export const getActivitiesForAthlete = async (
  athleteId: number,
  sportType?: SportType,
  client?: StratagizeClient
) => {
  const activityRepository = await createActivityRepository(client);
  return activityRepository.getActivitiesForAthlete(athleteId, sportType);
};
