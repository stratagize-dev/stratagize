import { inngest } from './client';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { createNotification } from '@/shared/services/notification/notification';

export const beginAthleteOnboarding = inngest.createFunction(
  { id: 'begin-athlete-onboarding' },
  { event: 'athlete/begin-onboarding' },
  async ({ event, step }) => {
    const athleteId = event.data.athleteId;

    const athleteRepository = await createAthletesRepository(serviceRoleDb);

    await athleteRepository.update(athleteId, {
      onboarding_status: 'in-progress'
    });

    await step.run(`sending notification for onboarding complete`, async () => {
      return await createNotification(
        athleteId,
        'Beginning athlete onboarding',
        undefined,
        serviceRoleDb
      );
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

    await step.run(`sending notification for onboarding complete`, async () => {
      return await createNotification(
        athleteId,
        'Activities have  completed loading',
        'onboarding-completed',
        serviceRoleDb
      );
    });
    return {
      status: 'ok',
      athleteId,
      message: 'athlete onboarding complete'
    };
  }
);
