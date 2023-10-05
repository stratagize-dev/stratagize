import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { Config } from '@/shared/config';

export const serviceRoleDb = createClient<Database>(
  Config.supabaseUrl,
  Config.supabaseServiceRoleKey,
  {
    auth: { persistSession: false }
  }
);

export default serviceRoleDb;
