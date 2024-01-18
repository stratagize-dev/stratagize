CREATE type onboarding_status as ENUM  (
    'not-started',
    'in-progress',
    'partially-complete',
    'complete',
    'error'
    )