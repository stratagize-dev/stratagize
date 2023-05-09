import { startOfYear } from 'date-fns';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';

async function fetchData(page: number, url: URL, accessToken: string) {
  url.searchParams.set('page', page.toString());

  const res = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  });

  // Recommendation: handle errors
  if (!res.ok) {
    console.debug({ error: await res.json() });
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return (await res.json()) as SummaryActivity[];
}
export const getActivityDataFromFirstOfYear = async (
  accessToken: string | undefined
) => getActivityData(accessToken, startOfYear(new Date()));

export async function getActivityData(
  accessToken: string | undefined,
  after: Date
) {
  if (!accessToken) return [];

  if (accessToken) {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');

    url.searchParams.append('after', (after.getTime() / 1000).toString());
    url.searchParams.append('per_page', '100');

    let allActivities: SummaryActivity[] = [];
    let page = 1;
    let perPage = 100;
    let totalRecords = perPage;

    while (totalRecords === perPage) {
      const activities = await fetchData(page, url, accessToken);
      allActivities = allActivities.concat(activities);
      totalRecords = activities.length;
      page++;
    }

    return allActivities;
  }

  return [];
}
