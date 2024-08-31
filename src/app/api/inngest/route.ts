import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import {
  beginAthleteOnboarding,
  finalizeAthleteOnboarding
} from '@/inngest/functions';
import { loadActivitiesFromStrava } from '@/inngest/loadActivitiesFromStrava';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    beginAthleteOnboarding,
    loadActivitiesFromStrava,
    finalizeAthleteOnboarding
  ]
});
