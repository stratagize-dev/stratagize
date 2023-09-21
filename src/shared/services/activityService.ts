import { db } from '@/shared/db';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import { Activity, SportType } from '@/shared/types/Activity';
import * as StravaApi from '@/shared/strava-client';
import { logDatabaseError } from '@/shared/error';

const defaultDate = (date?: Date) => (date ? new Date(date) : new Date());

const mapCommonFields = (detailedActivity: StravaApi.DetailedActivity) => ({
  name: detailedActivity.name ?? '',
  moving_time: detailedActivity.moving_time ?? 0,
  sport_type:
    detailedActivity.sport_type !== undefined
      ? (StravaApi.SportType[detailedActivity.sport_type] as SportType)
      : 'Unknown',
  start_date: defaultDate(detailedActivity.start_date).toISOString(),
  start_date_local: defaultDate(
    detailedActivity.start_date_local
  ).toISOString(),
  detailed_event: JSON.stringify(detailedActivity)
});

const deleteActivity = (activityId: number) => {
  return db.from('activities').delete().eq('id', activityId);
};

const getActivitiesForAthlete = async (athleteId: string) => {
  return db
    .from('activities')
    .select('*')
    .eq('athlete_id', Number(athleteId))
    .returns<Activity.Row[]>();
};

const saveSummaryActivities = async (summaryActivities: SummaryActivity[]) => {
  const activities: Activity.Insert[] = summaryActivities.map(value => ({
    athlete_id: value.athlete?.id ?? 0,
    name: value.name ?? '',
    id: value.id ?? 0,
    moving_time: value.moving_time ?? 0,
    sport_type: value.sport_type as unknown as SportType,
    start_date: value.start_date ?? '',
    start_date_local: value.start_date_local
  }));

  return db.from('activities').insert<Activity.Insert>(activities).select();
};

const insertDetailedActivity = async (
  detailedActivity: StravaApi.DetailedActivity
) => {
  const activity: Activity.Insert = {
    athlete_id: detailedActivity.athlete?.id ?? 0,
    id: detailedActivity.id ?? 0,
    ...mapCommonFields(detailedActivity)
  };

  const { data, error } = await db
    .from('activities')
    .insert<Activity.Insert>(activity)
    .select();

  logDatabaseError('error inserting detailed activity', error);

  return { activity: data, error };
};

const updateDetailedActivity = async (
  detailedActivity: StravaApi.DetailedActivity
) => {
  if (detailedActivity.id) {
    const activity: Activity.Update = {
      ...mapCommonFields(detailedActivity)
    };

    const { data, error } = await db
      .from('activities')
      .update<Activity.Update>(activity)
      .eq('id', detailedActivity.id)
      .select();

    logDatabaseError('error updating detailed activity', error);

    return { activity: data, error };
  }
};

export const activityService = () => ({
  deleteActivity,
  getActivitiesForAthlete,
  saveSummaryActivities,
  insertDetailedActivity,
  updateDetailedActivity
});
