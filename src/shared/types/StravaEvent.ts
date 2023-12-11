import { Database } from '../../../database.types';

type StravaEventTable = Database['public']['Tables']['strava_events'];

export namespace StravaEvent {
  export type Row = StravaEventTable['Row'];
  export type Insert = StravaEventTable['Insert'];
  export type Update = StravaEventTable['Update'];
}
