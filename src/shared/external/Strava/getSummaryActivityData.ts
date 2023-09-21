import { startOfYear } from 'date-fns';
import { ActivitiesApiFp, SummaryActivity } from '@/shared/strava-client';

// async function fetchData(
//   page: number,
//   url: URL,
//   accessToken: string,
//   signal?: AbortSignal
// ) {
//   url.searchParams.set('page', page.toString());
//
//   const res = await fetch(url, {
//     headers: {
//       Authorization: 'Bearer ' + accessToken,
//       'Content-Type': 'application/json'
//     },
//     signal
//   });
//
//   if (res.status === 429) {
//     alert('Rate Limit Exceeded');
//   }
//
//   // Recommendation: handle errors
//   if (!res.ok) {
//     // if()
//     console.debug({ error: await res.json() });
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//
//   return (await res.json()) as SummaryActivity[];
// }

export const getActivityDataFromFirstOfYear = async (
  accessToken: string | undefined,
  signal: AbortSignal
) => getSummaryActivityData(accessToken, signal, startOfYear(new Date()));

export async function getSummaryActivityData(
  accessToken: string | undefined,
  signal: AbortSignal,
  after: Date
) {
  if (!accessToken) return [];

  if (accessToken) {
    const activitiesApi = ActivitiesApiFp({ accessToken: accessToken });

    let allActivities: SummaryActivity[] = [];
    let page = 1;
    let perPage = 100;
    let totalRecords = perPage;

    while (totalRecords === perPage) {
      const activities = await activitiesApi.getLoggedInAthleteActivities(
        undefined,
        after.getTime() / 1000,
        page,
        perPage
      )();

      // const activities = await fetchData(page, url, accessToken, signal);
      allActivities = allActivities.concat(
        activities.filter(
          x =>
            x.id !== undefined &&
            x.athlete?.id !== undefined &&
            x.start_date !== undefined
        )
      );

      totalRecords = activities.length;
      page++;
    }

    return allActivities;
  }

  return [];
}

// export const loadActivityDataFromFirstOfYear = async (
//   accessToken: string | undefined
// ) => loadActivityData(accessToken, startOfYear(new Date()));
//
// export async function loadActivityData(
//   accessToken: string | undefined,
//   after: Date
// ): Promise<SummaryActivity[]> {
//   if (!accessToken) return [];
//
//   if (accessToken) {
//     const activitiesApi = ActivitiesApiFp({ accessToken: accessToken });
//     // const url = StravaEndpoints.athlete.activities;
//     //
//     // url.searchParams.append('after', (after.getTime() / 1000).toString());
//     // url.searchParams.append('per_page', '100');
//     //
//     let allActivities: SummaryActivity[] = [];
//     let page = 1;
//     let perPage = 100;
//     let totalRecords = perPage;
//
//     while (totalRecords === perPage) {
//       const activities = await fetchData(page, url, accessToken);
//       allActivities = allActivities.concat(
//         activities.filter(
//           x =>
//             x.id !== undefined &&
//             x.athlete?.id !== undefined &&
//             x.start_date !== undefined
//         )
//       );
//       totalRecords = activities.length;
//       page++;
//     }
//
//     return allActivities;
//   }
//
//   return [];
// }
