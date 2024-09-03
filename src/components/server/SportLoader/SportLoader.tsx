import { SportType } from '@/shared/types/Activity';
import { MountainBikeRide } from '@/components/server/MountainBikeRide';
import { Database } from '../../../../database.types';

export type SportsAllTimeStats =
  Database['public']['Views']['athlete_sport_all_time_stats']['Row'];

export type SportsYearlyStats =
  Database['public']['Views']['athlete_sport_yearly_stats']['Row'];

export function SportLoader({
  sportType,
  allTimeStats,
  yearlyStats
}: {
  sportType: SportType;
  allTimeStats: SportsAllTimeStats;
  yearlyStats: SportsYearlyStats[];
}) {
  switch (sportType) {
    case 'MountainBikeRide':
      return (
        <MountainBikeRide
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
        />
      );
    case 'AlpineSki':
      return (
        <MountainBikeRide
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
        />
      );
    case 'Kayaking':
      return (
        <MountainBikeRide
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
        />
      );
    default:
      return (
        <MountainBikeRide
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
        />
      );
  }
}
