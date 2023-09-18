import { db } from '@/shared/db';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import { Activity, SportType } from '@/shared/types/Activity';

export const getActivitiesForAthlete  = async (athleteId: string) => {
  return db
    .from('activities')
    .select('*')
    .eq('athlete_id', Number(athleteId))
    .returns<Activity.Row[]>()
  ;
}

export const saveSummaryActivities = async (summaryActivities: SummaryActivity[]) => {

  const activities: Activity.Insert[] = summaryActivities.map(value => ({
      athlete_id: value.athlete?.id ?? 0,
      name: value.name ?? '',
      id: value.id ?? 0,
      moving_time: value.moving_time ?? 0,
      sport_type: value.sport_type as SportType,
      start_date: value.start_date ?? '',
      start_date_local: value.start_date_local
    })
  )

  return db.from('activities')
    .insert<Activity.Insert>(activities)
    .select();
}
