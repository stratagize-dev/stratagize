import { StratagizeClient } from '@/shared/db';

export const getSportTypesForAthlete = async (
  athleteId: number,
  client?: StratagizeClient
) => {
  return client
    ?.from('athlete_sport_types')
    .select()
    .eq('athlete_id', athleteId);
};
