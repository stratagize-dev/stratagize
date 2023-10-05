import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { logDatabaseError } from '@/shared/error';

export async function performOperationAndLogError<T>(
  operation: () => Promise<PostgrestSingleResponse<T>>,
  errorMessage: string
) {
  const result = await operation();

  logDatabaseError(errorMessage, result.error);

  return result;
}
