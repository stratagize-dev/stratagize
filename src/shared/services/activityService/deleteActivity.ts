import { StratagizeClient } from '@/shared/db';
import { createActivityRepository } from '@/shared/repository/activityRepository';

export const deleteActivity = async (
  activityId: number,
  client?: StratagizeClient
) => {
  const activityRepository = await createActivityRepository(client);

  return activityRepository.delete(activityId);
};
