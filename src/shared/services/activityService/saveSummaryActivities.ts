import { StratagizeClient } from '@/shared/db';
import { Activity, SportType } from '@/shared/types/Activity';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import * as StravaApi from '@/shared/strava-client';
import { jobQueueService } from '@/shared/services/jobQueue';

export const saveSummaryActivities = async (
  summaryActivities: StravaApi.SummaryActivity[],
  client?: StratagizeClient
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

  await jobQueueService(client).createLoadDetailedActivityJob(activities);

  const activityRepository = await createActivityRepository(client);

  return activityRepository.upsert(activities);
};
