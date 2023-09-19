import { db } from '@/shared/db';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import { Activity, SportType } from '@/shared/types/Activity';
import { DetailedActivity } from '@/shared/strava-client';
import { logDatabaseError } from '@/shared/error';

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

const insertDetailedActivity = async (detailedActivity: DetailedActivity) => {
  const activity: Activity.Insert = {
    athlete_id: detailedActivity.athlete?.id ?? 0,
    name: detailedActivity.name ?? '',
    id: detailedActivity.id ?? 0,
    moving_time: detailedActivity.movingTime ?? 0,
    sport_type: detailedActivity.sportType
      ? (detailedActivity.sportType.toString() as SportType)
      : 'Unknown',
    start_date: new Date().toISOString(), //  detailedActivity.startDate?.toISOString() ?? '',
    start_date_local: new Date().toISOString() //detailedActivity.startDateLocal?.toISOString()
  };

  console.debug('activity', activity);

  const { data, error } = await db
    .from('activities')
    .insert<Activity.Insert>(activity)
    .select();

  logDatabaseError('error inserting detailed activity', error);

  console.debug('activity inserted', { data, error });
  return { activity: data, error };
};

export const activityService = () => ({
  deleteActivity,
  getActivitiesForAthlete,
  saveSummaryActivities,
  insertDetailedActivity
});
