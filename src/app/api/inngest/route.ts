import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import { finalizeAthleteOnboarding } from '@/inngest/functions';
import { loadActivitiesFromStrava } from '@/inngest/loadActivitiesFromStrava';
import { beginAthleteOnboarding } from '@/inngest/beginAthleteOnboarding';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    beginAthleteOnboarding,
    loadActivitiesFromStrava,
    finalizeAthleteOnboarding
  ]
});
