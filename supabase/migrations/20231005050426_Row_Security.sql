create or replace function auth.user_id() returns text as $$
select nullif(current_setting('request.jwt.claims', true)::json->>'userId', '')::text;
$$ language sql stable;

alter table "public"."activities" enable row level security;

alter table "public"."athletes" enable row level security;

create policy "Activities"
on "public"."activities"
as permissive
for all
to public
using ((auth.user_id() = (athlete_id)::text));


create policy "Athlete Policy"
on "public"."athletes"
as permissive
for all
to public
using ((auth.user_id() = (id)::text));



