import {getServerCustomSession} from "@/shared/auth";
import {SummaryActivity} from "@/shared/types/strava/SummaryActivity";
import {formatDistance, startOfMonth} from 'date-fns';
async function getData(accessToken: string | undefined) {

    const firstDayOfMonth = startOfMonth(new Date());
    if(accessToken)
    {
        const res = await fetch('https://www.strava.com/api/v3/athlete/activities?after=' + (firstDayOfMonth.getTime() / 1000 ), {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.

        // Recommendation: handle errors
        if (!res.ok) {
            //console.debug({error: await res.json()})
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }

        return await res.json() as SummaryActivity[];
    }

}

function get(seconds: number) : string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return hours + ' hours ' + minutes + ' minutes'
}
export default async function Stats()  {
    const session = await getServerCustomSession();


    const allSummaryActivity = await getData(session?.accessToken) ?? [];

    const totalMovingTimeSeconds = allSummaryActivity.reduce((previousValue, currentValue) => previousValue + (currentValue.moving_time ?? 0), 0)

    const secondsPerDay = 500 * 3060 / 365;
    const dayOfMonth = new Date().getDate()

    const expectedSeconds = Math.floor(dayOfMonth * secondsPerDay);


    const difference = Math.abs(totalMovingTimeSeconds - expectedSeconds);

    const differenceString = formatDistance(
        new Date(0),
        new Date(difference * 1000),
        { includeSeconds: true }
    );

    return (<ul>
        <li>goal time: 500 hours for year</li>
        <li>total moving time for month: {get(totalMovingTimeSeconds)}</li>
        <li>expected time for today: {get(expectedSeconds)}</li>
        <li>{differenceString}</li>

    </ul>);
}

