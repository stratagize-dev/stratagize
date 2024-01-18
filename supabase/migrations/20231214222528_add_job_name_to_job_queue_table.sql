alter table "public"."job_queue" add column "athlete_id" bigint;

alter table "public"."job_queue" add column "job_name" text not null;

alter table "public"."job_queue" add constraint "job_queue_athlete_id_fkey" FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE not valid;

alter table "public"."job_queue" validate constraint "job_queue_athlete_id_fkey";


