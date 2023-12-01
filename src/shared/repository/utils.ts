import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { logDatabaseError } from '@/shared/error';
import { getAuthDetails } from '@/shared/auth';
import { db, StravaGoalsClient } from '@/shared/db';

export async function performOperationAndLogError<T>(
  operation: () => Promise<PostgrestSingleResponse<T>>,
  errorMessage: string
) {
  const result = await operation();

  logDatabaseError(errorMessage, result.error);

  return result;
}

export async function createClient(
  client?: StravaGoalsClient
): Promise<StravaGoalsClient> {
  if (client === undefined) {
    const { supabaseToken } = await getAuthDetails();
    client = db(supabaseToken);
    return client;
  } else {
    return client;
  }
}
