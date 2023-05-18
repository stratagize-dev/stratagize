import useActivityStats from '@/hooks/useActivityStats';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import { addDays, startOfYear } from 'date-fns';

const targetGoalHours = 365;
const OneHourInSeconds = 3600;
const TwentyNineMinutesInSeconds = 1797; // 29 minutes 57 seconds
const FiftyEightMinutes = 3500; //58 minutes and 20
const OneHourTwentyFiveMinutes = 5132; // 1 hour, 25 minutes and 32 seconds ;

const today = new Date(
  'Thu May 18 2023 16:00:19 GMT+1200 (New Zealand Standard Time)'
);

const createActivities = (startDate: Date, endDate: Date, seconds: number) => {
  let activities: SummaryActivity[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    let newObject: SummaryActivity = {
      moving_time: seconds,
      start_date_local: currentDate.toString()
    };
    activities.push(newObject);
    currentDate = addDays(currentDate, 1);
  }
  return activities;
};
const oneHourADayActivities = createActivities(
  startOfYear(today),
  today,
  OneHourInSeconds
);
const activities: SummaryActivity[] = [
  {
    moving_time: TwentyNineMinutesInSeconds,
    start_date_local:
      'Sun Jan 1 2023 16:00:19 GMT+1200 (New Zealand Standard Time)'
  },
  {
    moving_time: FiftyEightMinutes,
    start_date_local:
      'Mon May 1 2023 16:00:19 GMT+1200 (New Zealand Standard Time)'
  },
  {
    moving_time: OneHourTwentyFiveMinutes,
    start_date_local:
      'Thu May 18 2023 16:00:19 GMT+1200 (New Zealand Standard Time)'
  }
];
describe('useActivityStats', () => {
  test('[requiredActivityPerDay] with a goal of 365 hours for the year the required activity per day should be 1 hour', () => {
    const { requiredActivityPerDay } = useActivityStats(
      targetGoalHours,
      today,
      []
    );

    expect(requiredActivityPerDay()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 1,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "1 h 0 m",
        "seconds": 3600,
      }
    `);
  });

  test('[secondsPerDayToComplete] with a goal of 365 hours for the year the secondsPerDayToComplete should be 1 hour', () => {
    const { secondsPerDayToComplete } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(secondsPerDayToComplete()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 1,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "1 h 0 m",
        "seconds": 3600,
      }
    `);
  });

  test('[year.totalMovingTime] should be correct', () => {
    const { year } = useActivityStats(targetGoalHours, today, activities);

    expect(year.totalMovingTime()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 2,
          "isAhead": true,
          "minutes": 53,
          "seconds": 49,
        },
        "human": "2 h 53 m",
        "seconds": 10429,
      }
    `);
  });

  test('[year.totalMovingTime] for an hour a day should be correct', () => {
    const { year } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(year.totalMovingTime()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 138,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "138 h 0 m",
        "seconds": 496800,
      }
    `);
  });

  test('[year.expectedTotal] should be correct', () => {
    const { year } = useActivityStats(targetGoalHours, today, activities);

    expect(year.expectedTotal()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 138,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "138 h 0 m",
        "seconds": 496800,
      }
    `);
  });

  test('[year.timeAhead] should be correct', () => {
    const { year } = useActivityStats(targetGoalHours, today, []);

    expect(year.timeAhead()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 138,
          "isAhead": false,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "138 h 0 m",
        "seconds": -496800,
      }
    `);
  });

  test('[year.actualDailyAverage] should be correct', () => {
    const { year } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(year.actualDailyAverage()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 1,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "1 h 0 m",
        "seconds": 3600,
      }
    `);
  });

  test('[year.projectedTotal] should be correct', () => {
    const { year } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(year.projectedTotal()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 365,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "365 h 0 m",
        "seconds": 1314000,
      }
    `);
  });

  test('[year.percentageComplete] should be correct', () => {
    const { year } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(year.percentageComplete).toBe(38);
  });

  test('[year.percentageAhead] should be correct', () => {
    const { year } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(year.percentageAhead).toBe(0);
  });

  test('[month.expectedTotal] for an hour a day should be correct', () => {
    const { month } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(month.expectedTotal()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 18,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "18 h 0 m",
        "seconds": 64800,
      }
    `);
  });

  test('[month.averageDaily] for an hour a day should be correct', () => {
    const { month } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(month.averageDaily()).toMatchInlineSnapshot(`
      {
        "duration": {
          "hours": 1,
          "isAhead": true,
          "minutes": 0,
          "seconds": 0,
        },
        "human": "1 h 0 m",
        "seconds": 3600,
      }
    `);
  });

  test('[month.percentageAhead] for an hour a day should be correct', () => {
    const { month } = useActivityStats(
      targetGoalHours,
      today,
      oneHourADayActivities
    );

    expect(month.percentageAhead).toBe(0);
  });
});
