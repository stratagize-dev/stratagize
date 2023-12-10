CREATE TRIGGER "load-detailed-activity"
    AFTER INSERT OR UPDATE
    ON public.activities
    FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request(
        'https://valid-factual-barnacle.ngrok-free.app/api/load-detailed-activitiy', 'POST',
        '{"Content-type":"application/json"}', '{}', '1000');


