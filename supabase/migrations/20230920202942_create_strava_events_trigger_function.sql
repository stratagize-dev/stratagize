create or replace trigger strava_events_trigger after insert on strava_events for each row execute function supabase_functions.http_request (
        'https://8a0f-124-248-141-65.ngrok-free.app/api/strava-event',
        'POST',
        '{"Content-type":"application/json"}',
        '{}',
        '1000'
    );