1. sudo supabase start
2. sudo supabase db reset


# Supabase

## Migrations

### Create New Migration
``` bash
supabase migration new MIGRATION_NAME
```

### Deploy Migration

```
supabase db push
```

### Create Auto Migration 

supabase db diff -f MIGRATION_NAME


