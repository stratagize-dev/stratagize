create or replace view "public"."max_activity_elevation" as

SELECT AC1.athlete_id,
       AC1.id,
       AC1.sport_type,
       AC1.total_elevation_gain,
       AC1.year,
       AC1.name
FROM activities AC1,
     (SELECT sport_type, MAX(total_elevation_gain) AS max_total_elevation_gain, year, athlete_id
      FROM activities
      GROUP BY sport_type, year, athlete_id) AC2
WHERE AC1.sport_type = AC2.sport_type
  AND AC1.athlete_id = AC2.athlete_id
  AND AC1.total_elevation_gain = AC2.max_total_elevation_gain
  AND AC1.year = AC2.year
  AND AC2.max_total_elevation_gain > 0
ORDER BY sport_type, year;




