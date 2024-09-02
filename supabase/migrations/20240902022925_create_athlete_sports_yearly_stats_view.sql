create or replace view "public"."athlete_sport_yearly_stats" as

SELECT activities.athlete_id,
       activities.sport_type,
       activities.year,
       count(activities.sport_type)         AS total_activities,
       avg(activities.distance)             AS avg_distance,
       sum(activities.distance)             AS total_distance,
       max(activities.distance)             AS max_distance,
       avg(activities.moving_time)          AS avg_moving_time,
       sum(activities.moving_time)          AS total_moving_time,
       max(activities.moving_time)          AS max_moving_time,
       avg(activities.total_elevation_gain) AS avg_elevation_gain,
       sum(activities.total_elevation_gain) AS total_elevation_gain,
       max(activities.total_elevation_gain) AS max_elevation_gain,
       max(activities.max_speed)            AS max_speed,
       max(activities.max_watts)            AS max_watts,
       sum(activities.achievement_count)    AS total_achievements,
       sum(activities.kudos_count)          AS total_kudos
FROM activities

group by activities.athlete_id, activities.sport_type, activities.year
order by sport_type, year asc;