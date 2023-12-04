import { StravaGoalsClient } from '@/shared/db';
import { Activity, SportType } from '@/shared/types/Activity';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import * as StravaApi from '@/shared/strava-client';
import { JobQueue } from '@/shared/types/JobQueue';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';

export const saveSummaryActivities = async (
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

  const jobs: JobQueue.Insert[] = activities.map(activity => ({
    http_verb: 'POST',
    url_path:
      'https://valid-factual-barnacle.ngrok-free.app/api/job-handler/load-detailed-activity',
    payload: activity
  }));

  const jobsRepository = await createJobQueueRepository(client);

  await jobsRepository.upsert(jobs);

  const activityRepository = await createActivityRepository(client);

  return activityRepository.upsert(activities);
};
