import { StravaGoalsClient } from '@/shared/db';

export const getSportTypesForAthlete = async (
  athleteId: number,
  client?: StravaGoalsClient
) => {
  return client
    ?.from('athlete_sport_types')
    .select()
    .eq('athlete_id', athleteId);
};
