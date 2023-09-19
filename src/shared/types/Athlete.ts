import { Database } from '../../../database.types';

type Athlete = Database['public']['Tables']['athletes'];

export namespace Athlete {
  export type Row = Athlete['Row'];
  export type Insert = Athlete['Insert'];
  export type Update = Athlete['Update'];
}
