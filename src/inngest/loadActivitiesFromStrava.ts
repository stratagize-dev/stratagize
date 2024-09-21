import { inngest } from '@/inngest/client';
import { createAthletesRepository } from '@/shared/repository/athleteRepository';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import summaryActivityService from '@/shared/external/Strava/services/summaryActivityService';
import { activityService } from '@/shared/services/activityService';
import { createNotification } from '@/shared/services/notification/notification';

export const loadActivitiesFromStrava = inngest.createFunction(
  { id: 'load-strava-activities' },
  { event: 'activity/load' },
  async ({ event, step, logger }) => {
    const { athleteId, pageSize, pageNumber } = event.data;

    const athleteRepository = await createAthletesRepository(serviceRoleDb);

    const { data: athlete } = await athleteRepository.get(athleteId);

    if (athlete?.refresh_token) {
      const tokenResult = await refreshToken(athlete.refresh_token);

      const accessToken = tokenResult.accessToken;
      if (!accessToken) {
        throw new Error('unable to get refresh token');
      }

      const activitiesForPage = await step.run(
        `loading activity data for athlete:${athleteId} for page ${pageNumber}`,
        async () =>
          summaryActivityService.loadPage(accessToken, pageSize, pageNumber)
      );

      const { error, data: savedActivities } = await step.run(
        `saving activity data for athlete:${athleteId} for page ${pageNumber}`,
        async () =>
          activityService(serviceRoleDb).saveSummaryActivities(
            activitiesForPage
          )
      );

      if (error) {
        logger.error(
          `error saving activity data for athlete:${athleteId} for page ${pageNumber}`
        );
      }

      const totalRecordsLoaded =
        activitiesForPage.length + (pageNumber - 1) * pageSize;

      await step.run(
        `sending notification for total records loaded ${totalRecordsLoaded}`,
        async () => {
          return await createNotification(
            athleteId,
            `${totalRecordsLoaded} activities loaded...`,
            undefined,
            serviceRoleDb
          );
        }
      );

      if (activitiesForPage.length === pageSize) {
        await step.sendEvent(`load-strava-activities`, {
          name: 'activity/load',
          data: { ...event.data, pageNumber: pageNumber + 1 }
        });
      } else {
        await step.sendEvent('finalize-athlete-onboarding', {
          name: 'athlete/finalize-onboarding',
          data: { athleteId }
        });
      }
      return savedActivities;
    }
  }
);
