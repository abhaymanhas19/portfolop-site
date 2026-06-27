# Portfolio Backend

## Database migrations with Alembic

Alembic manages changes to the PostgreSQL database schema. Run all commands
below from the `Backend` directory.

### Local development

After changing a SQLModel model, generate a migration:

```bash
uv run alembic revision --autogenerate -m "describe the change"
```

Review the generated file in `alembic/versions/`. Alembic may not detect every
change perfectly, especially column or table renames.

Apply all pending migrations to the local database:

```bash
uv run alembic upgrade head
```

Commit the generated migration file with the related model changes.

### Production

Deploy the committed migration files with the application. Do not run
`revision --autogenerate` in production. Apply existing migrations before
starting the new application version:

```bash
uv sync --frozen
uv run alembic upgrade head
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

Back up the production database before applying destructive or complex schema
changes.

### Useful commands

```bash
# Show the migration currently applied to the database
uv run alembic current

# Show migration history
uv run alembic history

# Undo the most recently applied migration
uv run alembic downgrade -1
```

`SQLModel.metadata.create_all()` only creates tables that do not exist. It does
not update existing columns, constraints, or indexes, so existing schema changes
must be applied through Alembic.
