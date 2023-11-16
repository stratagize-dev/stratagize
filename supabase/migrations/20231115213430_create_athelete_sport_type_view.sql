create or replace view "public"."athlete_sport_types" as  SELECT DISTINCT activities.athlete_id,
    activities.sport_type
   FROM activities;



