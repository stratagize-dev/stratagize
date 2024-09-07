create or replace view "public"."max_activity_distance" as

SELECT AC1.athlete_id,
       AC1.id,
       AC1.sport_type,
       AC1.distance,
       AC1.year,
       AC1.name
FROM activities AC1,
     (SELECT sport_type, MAX(distance) AS max_distance, year, athlete_id
      FROM activities
      GROUP BY sport_type, year, athlete_id) AC2
WHERE AC1.sport_type = AC2.sport_type
  AND AC1.athlete_id = AC2.athlete_id
  AND AC1.distance = AC2.max_distance
  AND AC1.year = AC2.year
  AND AC2.max_distance > 0
ORDER BY sport_type, year;




