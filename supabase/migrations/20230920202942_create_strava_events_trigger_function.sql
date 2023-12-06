create or replace trigger strava_events_trigger after insert on strava_events for each row execute function supabase_functions.http_request (
        'https://valid-factual-barnacle.ngrok-free.app/api/strava-event',
        'POST',
        '{"Content-type":"application/json"}',
        '{}',
        '1000'
    );