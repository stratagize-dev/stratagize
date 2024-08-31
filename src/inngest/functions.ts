import { inngest } from './client';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import serviceRoleDb from '@/shared/serviceRoleDb';

export const beginAthleteOnboarding = inngest.createFunction(
  { id: 'begin-athlete-onboarding' },
  { event: 'athlete/begin-onboarding' },
  async ({ event, step }) => {
    const athleteId = event.data.athleteId;

    const athleteRepository = await createAthletesRepository(serviceRoleDb);

    await athleteRepository.update(athleteId, {
      onboarding_status: 'in-progress'
    });

    await step.sendEvent(
      // `load-strava-activities-${athleteId}`,
      `load-strava-activities`,
      {
        name: 'activity/load',
        data: { athleteId: athleteId, pageNumber: 1, pageSize: 100 }
      }
    );

    return {
      status: 'ok',
      athleteId,
      message: 'athlete onboarding begun'
    };
  }
);

export const finalizeAthleteOnboarding = inngest.createFunction(
  { id: 'finalize-athlete-onboarding' },
  { event: 'athlete/finalize-onboarding' },
  async ({ event, step }) => {
    const athleteId = event.data.athleteId;

    const athleteRepository = await createAthletesRepository(serviceRoleDb);

    await athleteRepository.update(athleteId, {
      onboarding_status: 'complete'
    });

    return {
      status: 'ok',
      athleteId,
      message: 'athlete onboarding complete'
    };
  }
);
