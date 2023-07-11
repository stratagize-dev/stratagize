import { SportType } from '@/shared/types/strava/sportType';

export interface ActivitySummary {
  id: number;
  athleteId: number;
  movingTime: number;
  name?: string;
  startDate: string;
  startDateLocal?: string;
  sportType?: SportType;
}
