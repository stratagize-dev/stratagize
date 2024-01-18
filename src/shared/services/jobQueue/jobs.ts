import { getApiBaseUrl } from '@/shared/url';

export type JobName =
  | 'onboard-athlete'
  | 'load-detailed-activity'
  | 'finalize-athlete-onboarding';

const constructJobSettings = (jobName: JobName) => {
  return {
    name: jobName,
    url: `${getApiBaseUrl()}/job-handler/${jobName}`,
    createJobKey: (uniqueKey: number) => `${jobName}-${uniqueKey}`
  };
};
export const onboardAthleteJob = constructJobSettings('onboard-athlete');

export const loadDetailedActivityJob = constructJobSettings(
  'load-detailed-activity'
);

export const finalizeAthleteOnboardingJob = constructJobSettings(
  'finalize-athlete-onboarding'
);
