drop view if exists "public"."athlete_sport_types";

alter table "public"."activities" add column "year" smallint not null;

create or replace view "public"."athlete_sport_types" as  SELECT DISTINCT activities.athlete_id,
    activities.sport_type
   FROM activities;



