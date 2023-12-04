import { StravaGoalsClient } from '@/shared/db';
import { Athlete } from '@/shared/types/Athlete';
import {
  createClient,
  performOperationAndLogError
} from '@/shared/repository/utils';

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

export const createAthletesRepository = async (client?: StravaGoalsClient) => {
  client = await createClient(client);

  return {
    get: get(client),
    insert: insert(client),
    update: update(client)
  };
};
