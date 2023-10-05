export const Config = {
  clientId: process.env.CLIENT_ID ?? '',
  clientSecret: process.env.CLIENT_SECRET ?? '',
  stravaVerificationToken: process.env.STRAVA_VERIFY_TOKEN ?? '',
  stravaSubscriptionId: Number(process.env.STRAVA_SUBSCRIPTION_ID),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  supabaseJWTSecret: process.env.SUPABASE_JWT_SECRET ?? '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
};
