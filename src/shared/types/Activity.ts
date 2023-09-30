import { Database } from '../../../database.types';
import * as StravaApi from '@/shared/strava-client';
type Activity = Database['public']['Tables']['activities'];

export namespace Activity {
  export type Row = Activity['Row'];
  export type Insert = Activity['Insert'];
  export type Update = Activity['Update'];
}

export type SportType = Database['public']['Enums']['sport_type'];

export const convertSportType = (sportType?: StravaApi.SportType) =>
  sportType ? (StravaApi.SportType[sportType] as SportType) : 'Unknown';
