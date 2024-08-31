import { StratagizeClient } from '@/shared/db';
import { Activity, SportType } from '@/shared/types/Activity';
import { createActivityRepository } from '@/shared/repository/activityRepository';
import * as StravaApi from '@/shared/strava-client';
import { getYear } from 'date-fns';

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
    start_date_local: value.start_date_local,
    achievement_count: value.achievement_count,
    athlete_count: value.athlete_count,
    average_speed: value.average_speed,
    average_watts: value.average_watts,
    comment_count: value.comment_count,
    distance: value.distance,
    device_watts: value.device_watts,
    elapsed_time: value.elapsed_time,
    elev_high: value.elev_high,
    elev_low: value.elev_low,
    kilojoules: value.kilojoules,
    kudos_count: value.kudos_count,
    max_speed: value.max_speed,
    max_watts: value.max_watts,
    timezone: value.timezone,
    total_elevation_gain: value.total_elevation_gain,
    weighted_average_watts: value.weighted_average_watts,
    year: value.start_date_local
      ? getYear(value.start_date_local)
      : getYear(new Date())
  }));

  const activityRepository = await createActivityRepository(client);

  return activityRepository.upsert(activities);
};
