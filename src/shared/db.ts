import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { Config } from '@/shared/config';

export const db = createClient<Database>(
  Config.supabaseUrl,
  Config.supabaseAnonKey,
  { auth: { persistSession: false } }
);
