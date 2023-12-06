drop trigger if exists "strava_events_trigger" on "public"."strava_events";

alter table "public"."strava_events" enable row level security;

create policy "Enable read access for all users"
on "public"."strava_events"
as permissive
for all
to public
using (false);


CREATE OR REPLACE TRIGGER strava_events_trigger AFTER INSERT ON public.strava_events FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://valid-factual-barnacle.ngrok-free.app/api/strava-event', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


