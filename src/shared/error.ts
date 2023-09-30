import { PostgrestError } from '@supabase/supabase-js';

export const logDatabaseError = (
  message: string,
  error: PostgrestError | null
) => {
  if (error) {
    console.error(message, error);
  }
};
