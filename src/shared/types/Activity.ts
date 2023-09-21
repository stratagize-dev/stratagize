import { Database } from '../../../database.types';

type Activity = Database['public']['Tables']['activities'];

export namespace Activity {
  export type Row = Activity['Row'];
  export type Insert = Activity['Insert'];
  export type Update = Activity['Update'];
}

export type SportType = Database['public']['Enums']['sport_type'];
