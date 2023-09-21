import { db } from '@/shared/db';
import { Athlete } from '@/shared/types/Athlete';
import { logDatabaseError } from '@/shared/error';

const athletesTable = db.from('athletes');

const getAthlete = (athleteId: number) =>
  db.from('athletes').select('*').eq('id', athleteId).single<Athlete.Row>();

const updateAthleteSession = async (
  athleteId: number,
  refreshToken: string
) => {
  const { data: athlete } = await getAthlete(athleteId);

  if (athlete) {
    const { error } = await athletesTable
      .update({ refresh_token: refreshToken })
      .eq('id', athleteId)
      .select();

    logDatabaseError('error updating refresh token', error);
  } else {
    const { error } = await insertAthlete({
      id: athleteId,
      hour_goal: 365,
      is_onboarded: false,
      refresh_token: refreshToken
    });

    logDatabaseError('error inserting athlete', error);
  }
};

const insertAthlete = async (athlete: Athlete.Insert) =>
  athletesTable.insert(athlete).select();

const athleteService = {
  getAthlete,
  insertAthlete,
  updateAthleteSession
};

export default athleteService;
