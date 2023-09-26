export const Config = {
  clientId: process.env.CLIENT_ID ?? '',
  clientSecret: process.env.CLIENT_SECRET ?? '',
  stravaVerificationToken: process.env.STRAVA_VERIFY_TOKEN ?? '',
  stravaSubscriptionId: Number(process.env.STRAVA_SUBSCRIPTION_ID),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
};
