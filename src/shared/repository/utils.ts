import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { getAuthDetails } from '@/shared/auth';
import { db, StratagizeClient } from '@/shared/db';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';

export async function performOperationAndLogError<T>(
  operation: () => Promise<PostgrestSingleResponse<T>>,
  errorMessage: string
) {
  const result = await operation();

  logDatabaseError(errorMessage, result.error);

  return result;
}

export async function createClient(
  client?: StratagizeClient
): Promise<StratagizeClient> {
  if (client === undefined) {
    const { supabaseToken } = await getAuthDetails();
    client = db(supabaseToken);
    return client;
  } else {
    return client;
  }
}
