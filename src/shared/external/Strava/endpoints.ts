const baseUrl = new URL('https://www.strava.com/api/v3');

export const StravaEndpoints = {
  token: new URL('https://www.strava.com/oauth/token'),
  athlete: {
    activities: new URL('athlete/activities', baseUrl),
    activity: (activityId: number) =>
      new URL(`athlete/activities/${activityId}`, baseUrl)
  },
  subscription: new URL('push_subscriptions', baseUrl)
};
