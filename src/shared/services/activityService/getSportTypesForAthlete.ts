import { StratagizeClient } from '@/shared/db';

export const getSportTypesForAthlete = async (
  athleteId: number,
  client?: StratagizeClient
) => {
  return client
    ?.from('athlete_sport_all_time_stats')
    .select('sport_type')
    .eq('athlete_id', athleteId);
};
