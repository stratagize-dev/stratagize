import { SportType } from '@/shared/types/strava/sportType';

/***
 * @deprecated use Activity instead
 */
export interface ActivitySummary {
  id: number;
  athleteId: number;
  movingTime: number;
  name?: string;
  startDate: string;
  startDateLocal?: string;
  sportType?: SportType;
}
