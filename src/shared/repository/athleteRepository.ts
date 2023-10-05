import { db, StravaGoalsClient } from '@/shared/db';
import { Athlete } from '@/shared/types/Athlete';
import { getServerCustomSession } from '@/shared/auth';
import { performOperationAndLogError } from '@/shared/repository/utils';

const get = (stravaGoalsClient: StravaGoalsClient) => (athleteId: number) =>
  performOperationAndLogError(
    async () =>
      stravaGoalsClient
        .from('athletes')
        .select('*')
        .eq('id', athleteId)
        .single<Athlete.Row>(),
    'an error occured retrieving the athlete'
  );

const update =
  (stravaGoalsClient: StravaGoalsClient) =>
  (athleteId: number, athlete: Athlete.Update) =>
    performOperationAndLogError(
      async () =>
        await stravaGoalsClient
          .from('athletes')
          .update(athlete)
          .eq('id', athleteId)
          .select(),
      'an error occured updating the athlete'
    );

const insert =
  (stravaGoalsClient: StravaGoalsClient) => (athlete: Athlete.Insert) =>
    performOperationAndLogError(
      async () =>
        await stravaGoalsClient.from('athletes').insert(athlete).select(),
      'an error occured inserting athlete'
    );

export const athleteRepository = {
  get: (supabaseToken: string) => get(db(supabaseToken)),
  insert: (supabaseToken: string) => insert(db(supabaseToken)),
  update: (supabaseToken: string) => update(db(supabaseToken))
};

export const createAthletesRepository = async () => {
  const session = await getServerCustomSession();
  return {
    get: athleteRepository.get(session.supabaseToken),
    insert: athleteRepository.insert(session.supabaseToken),
    update: athleteRepository.update(session.supabaseToken)
  };
};

export default athleteRepository;
