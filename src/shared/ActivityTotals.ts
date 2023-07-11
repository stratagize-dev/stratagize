import { InternalSportType } from '@/components/components/hooks/types';

export interface ActivityTotals {
  totalMovingTime: number;
  totalCount: number;
  sports: Record<
    InternalSportType,
    { totalTimeSeconds: number; count: number }
  >;
}
