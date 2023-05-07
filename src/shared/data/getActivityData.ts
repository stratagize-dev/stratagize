import { startOfMonth } from 'date-fns';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';

export const getActivityDataFromFirstOfMonth = async (
  accessToken: string | undefined
) => getActivityData(accessToken, startOfMonth(new Date()));

export async function getActivityData(
  accessToken: string | undefined,
  after: Date
) {
  if (!accessToken) return [];

  const firstDayOfMonth = startOfMonth(new Date());

  if (accessToken) {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');

    const searchParams = new URLSearchParams();
    searchParams.append('after', (after.getTime() / 1000).toString());

    const res = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?after=' +
        firstDayOfMonth.getTime() / 1000,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    // Recommendation: handle errors
    if (!res.ok) {
      //console.debug({error: await res.json()})
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    const result = (await res.json()) as SummaryActivity[];

    return result;
  }

  return [];
}
