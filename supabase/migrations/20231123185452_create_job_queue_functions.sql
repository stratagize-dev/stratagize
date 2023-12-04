CREATE OR REPLACE FUNCTION job_queue_unprocessed()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/unprocessed',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION job_queue_processing()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/processing',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION job_queue_failed()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/failed',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;
