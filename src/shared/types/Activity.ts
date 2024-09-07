import { Database } from '../../../database.types';
type ActivityTable = Database['public']['Tables']['activities'];

export namespace Activity {
  export type Row = ActivityTable['Row'];
  export type Insert = ActivityTable['Insert'];
  export type Update = ActivityTable['Update'];
}

export type SportType = Database['public']['Enums']['sport_type'];

export type MaxActivityDistance =
  Database['public']['Views']['max_activity_distance']['Row'];

export type MaxActivityElevation =
  Database['public']['Views']['max_activity_elevation']['Row'];
