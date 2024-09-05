1. sudo supabase start
2. sudo supabase db reset


# Supabase

## Migrations

### Create New Migration
``` bash
sudo supabase migration new MIGRATION_NAME
```

### Deploy Migration

```
sudo supabase db push
```

### Create Auto Migration 

 ```sudo supabase db diff -f MIGRATION_NAME ```


