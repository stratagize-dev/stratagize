import { SportType } from '@/shared/types/Activity';
import { SportsStatistic } from '@/shared/services/statistics/types';
import { time } from '@/shared/types/time';

function calculateSportsStatistics(
  sports: Partial<
    Record<
      SportType,
      {
        totalTimeSeconds: number;
        count: number;
      }
    >
  >,
  totalMovingTimeSeconds: number
) {
  const sportStatistics: SportsStatistic[] = [];
  for (const sportsType in sports) {
    const sportsStats = sports[sportsType as SportType];
    if (sportsStats) {
      sportStatistics.push({
        sportType: sportsType as SportType,
        totalMovingTime: time(sportsStats.totalTimeSeconds),
        percentage:
          (sportsStats.totalTimeSeconds / totalMovingTimeSeconds) * 100,
        activityCount: sportsStats.count
      });
    }
  }
  return sportStatistics;
}

export { calculateSportsStatistics };
