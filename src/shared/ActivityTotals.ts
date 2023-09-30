import { SportType } from '@/shared/types/Activity';

export interface RunningTotal {
  totalTimeSeconds: number;
  count: number;
}
export interface ActivityTotals {
  totalMovingTime: number;
  totalCount: number;
  sports: Partial<Record<SportType, RunningTotal>>;
}
