import { Database } from '../../../database.types';

type StravaEvent = Database['public']['Tables']['strava_events'];

export namespace StravaEvent {
  export type Row = StravaEvent['Row'];
  export type Insert = StravaEvent['Insert'];
  export type Update = StravaEvent['Update'];
}
