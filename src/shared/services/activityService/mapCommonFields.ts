import { SportType } from '@/shared/types/Activity';
import * as StravaApi from '@/shared/strava-client';
const defaultDate = (date?: string) => date ?? new Date().toISOString();

export const mapCommonFields = (
  detailedActivity: StravaApi.DetailedActivity
) => ({
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
