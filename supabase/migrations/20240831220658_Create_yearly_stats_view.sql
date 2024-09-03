create or replace view "public"."athlete_yearly_summary" as
SELECT athlete_id,
       year,
       count(activities.sport_type)         AS total_activities,
       sum(activities.distance)             AS total_distance,
       max(activities.distance)             AS max_distance,
       sum(activities.moving_time)          AS total_moving_time,
       max(activities.moving_time)          AS max_moving_time,
       sum(activities.total_elevation_gain) AS total_elevation_gain,
       max(activities.total_elevation_gain) AS max_elevation_gain,
       max(activities.max_speed)            AS max_speed,
       max(activities.max_watts)            AS max_watts,
       sum(activities.achievement_count)    AS total_achievements,
       sum(activities.kudos_count)          AS total_kudos
FROM activities

group by athlete_id, year
