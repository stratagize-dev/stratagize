import { MaxActivityDistance, SportType } from '@/shared/types/Activity';
import { MountainBikeRide } from '../../client/MountainBikeRide';
import { Database } from '../../../../database.types';

export type SportsAllTimeStats =
  Database['public']['Views']['athlete_sport_all_time_stats']['Row'];

export type SportsYearlyStats =
  Database['public']['Views']['athlete_sport_yearly_stats']['Row'];

export function SportLoader({
  sportType,
  allTimeStats,
  yearlyStats,
  maxActivityDistances
}: {
  sportType: SportType;
  allTimeStats: SportsAllTimeStats;
  yearlyStats: SportsYearlyStats[];
  maxActivityDistances: MaxActivityDistance[];
}) {
  switch (sportType) {
    case 'Yoga':
      return (
        <MountainBikeRide
          displayDistance={false}
          displayElevation={false}
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
          maxActivityDistances={maxActivityDistances}
        />
      );
    case 'RockClimbing':
      return (
        <MountainBikeRide
          displayElevation={false}
          displayAchievements={false}
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
          maxActivityDistances={maxActivityDistances}
        />
      );
    case 'Workout':
    case 'WeightTraining':
      return (
        <MountainBikeRide
          displayElevation={false}
          displayDistance={false}
          displayAchievements={false}
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
          maxActivityDistances={maxActivityDistances}
        />
      );

    case 'Kayaking':
    case 'StandUpPaddling':
      return (
        <MountainBikeRide
          displayElevation={false}
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
          maxActivityDistances={maxActivityDistances}
        />
      );
    default:
      return (
        <MountainBikeRide
          allTimeStats={allTimeStats}
          yearlyStats={yearlyStats}
          maxActivityDistances={maxActivityDistances}
        />
      );
  }
}
