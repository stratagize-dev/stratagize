create sequence "public"."notifications_notification_id_seq";

create table "public"."notifications" (
    "notification_id" integer not null default nextval('notifications_notification_id_seq'::regclass),
    "athlete_id" bigint not null,
    "created_at" timestamp with time zone default now(),
    "message" text not null,
    "is_delivered" boolean default false
);


alter sequence "public"."notifications_notification_id_seq" owned by "public"."notifications"."notification_id";

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (notification_id);

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."notifications" add constraint "notifications_athletes_id_fk" FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_athletes_id_fk";


