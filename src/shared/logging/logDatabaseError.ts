import { PostgrestError } from '@supabase/supabase-js';
import logError from '@/shared/logging/logError';

export const logDatabaseError = (
  message: string,
  error: PostgrestError | null
) => {
  if (error) {
    logError(message, error ?? undefined);
  }
};
