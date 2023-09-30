import { db } from '@/shared/db';
import { Athlete } from '@/shared/types/Athlete';
import { logDatabaseError } from '@/shared/error';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

const athletesTable = db.from('athletes');

async function performOperationAndLogError<T>(
  operation: () => Promise<PostgrestSingleResponse<T>>,
  errorMessage: string
) {
  const result = await operation();

  logDatabaseError(errorMessage, result.error);

  return result;
}

const get = (athleteId: number) =>
  performOperationAndLogError(
    async () =>
      athletesTable.select('*').eq('id', athleteId).single<Athlete.Row>(),
    'an error occured retrieving the athlete'
  );

const update = async (athleteId: number, athlete: Athlete.Update) =>
  performOperationAndLogError(
    async () =>
      await athletesTable.update(athlete).eq('id', athleteId).select(),
    'an error occured updating the athlete'
  );

const insert = async (athlete: Athlete.Insert) =>
  performOperationAndLogError(
    async () => await athletesTable.insert(athlete).select(),
    'an error occured inserting athlete'
  );

const athleteRepository = {
  get,
  insert,
  update
};

export default athleteRepository;
