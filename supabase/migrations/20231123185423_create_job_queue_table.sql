
CREATE TABLE job_queue (
                           job_id serial PRIMARY KEY,
                           http_verb TEXT NOT NULL CHECK (http_verb IN ('GET', 'POST', 'DELETE')),
                           payload jsonb,
                           status TEXT NOT NULL DEFAULT '',
                           retry_count INTEGER DEFAULT 0,
                           retry_limit INTEGER DEFAULT 10,
                           url_path TEXT DEFAULT '',
                           content TEXT DEFAULT '',
                           created_at TIMESTAMPTZ DEFAULT NOW()
);





