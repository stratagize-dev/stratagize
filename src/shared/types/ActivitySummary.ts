import { SportType } from '@/shared/types/strava/sportType';

export interface ActivitySummary {
  athlete?: {
    id: 324132;
    // resource_state: 1
  };
  moving_time?: number;
  name?: string;
  start_date?: string;
  start_date_local?: string;
  sport_type?: SportType;
  id?: number;
}
