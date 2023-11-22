import { StravaGoalsClient } from '@/shared/db';
import { createActivityRepository } from '@/shared/repository/activityRepository';

export const deleteActivity = async (
  activityId: number,
  client?: StravaGoalsClient
) => {
  const activityRepository = await createActivityRepository(client);

  return activityRepository.delete(activityId);
};
