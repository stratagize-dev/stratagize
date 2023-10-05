import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { Config } from '@/shared/config';
import { GenericSchema } from '@supabase/postgrest-js/src/types';

export const db = (accessToken: string): StravaGoalsClient =>
  createClient<Database>(Config.supabaseUrl, Config.supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  });

export type StravaGoalsClient = SupabaseClient<
  Database,
  'public' extends keyof Database ? 'public' : string & keyof Database,
  Database['public'] extends GenericSchema ? Database['public'] : any
>;
