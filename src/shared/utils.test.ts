import { secondsToHourDuration } from '@/shared/utils';
import { describe, test, expect } from '@jest/globals';

describe('secondsToHourDuration', () => {
  test('1797 seconds should be 29 minutes 57 seconds', () => {
    const result = secondsToHourDuration(1797);

    expect(result).toMatchInlineSnapshot(`
      {
        "hours": 0,
        "isAhead": true,
        "minutes": 29,
        "seconds": 57,
      }
    `);
  });

  test('3500 seconds should be 58 minutes and 20', () => {
    const result = secondsToHourDuration(3500);

    expect(result).toMatchInlineSnapshot(`
      {
        "hours": 0,
        "isAhead": true,
        "minutes": 58,
        "seconds": 20,
      }
    `);
  });

  test('5132 seconds should be 1 hour, 25 minutes and 32 seconds', () => {
    const result = secondsToHourDuration(5132);

    expect(result).toMatchInlineSnapshot(`
      {
        "hours": 1,
        "isAhead": true,
        "minutes": 25,
        "seconds": 32,
      }
    `);
  });

  test('10429 seconds should be 2 hours, 20 minutes and 29 seconds', () => {
    const result = secondsToHourDuration(10429);

    expect(result).toMatchInlineSnapshot(`
      {
        "hours": 2,
        "isAhead": true,
        "minutes": 53,
        "seconds": 49,
      }
    `);
  });
});
