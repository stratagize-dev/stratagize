import { startOfYear } from 'date-fns';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';

async function fetchData(
  page: number,
  url: URL,
  accessToken: string,
  signal?: AbortSignal
) {
  url.searchParams.set('page', page.toString());

  console.debug('stuart', url.search);
  const res = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    signal
  });

  if (res.status === 429) {
    alert('Rate Limit Exceeded');
  }

  // Recommendation: handle errors
  if (!res.ok) {
    // if()
    console.debug({ error: await res.json() });
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return (await res.json()) as SummaryActivity[];
}

export const getActivityDataFromFirstOfYear = async (
  accessToken: string | undefined,
  signal: AbortSignal
) => getActivityData(accessToken, signal, startOfYear(new Date()));

export async function getActivityData(
  accessToken: string | undefined,
  signal: AbortSignal,
  after: Date
) {
  if (!accessToken) return [];

  if (accessToken) {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');

    url.searchParams.append('after', (after.getTime() / 1000).toString());
    url.searchParams.append('per_page', '100');

    let allActivities: ActivitySummary[] = [];
    let page = 1;
    let perPage = 100;
    let totalRecords = perPage;

    while (totalRecords === perPage) {
      const activities = await fetchData(page, url, accessToken, signal);
      allActivities = allActivities.concat(
        activities
          .filter(
            x =>
              x.id !== undefined &&
              x.athlete?.id !== undefined &&
              x.start_date !== undefined
          )
          .map(value => {
            const x: ActivitySummary = {
              id: value.id ?? 0,
              athleteId: value.athlete?.id ?? 0,
              name: value.name,
              movingTime: value.moving_time ?? 0,
              sportType: value.sport_type,
              startDate: value.start_date ?? '',
              startDateLocal: value.start_date_local
            };
            return x;
          })
      );
      totalRecords = activities.length;
      page++;
    }

    return allActivities;
  }

  return [];
}
