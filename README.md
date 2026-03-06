# Task Management API

A REST API for managing tasks built with FastAPI, SQLAlchemy, and SQLite.

## Setup

**Requirements:** Python 3.9+

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`.

Interactive docs (Swagger UI) are at `http://localhost:8000/docs`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/tasks` | List tasks (filter by `status`, `priority`; paginate with `skip`, `limit`) |
| GET | `/tasks/{id}` | Get a single task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

### Example: Create a task

```bash
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "priority": "high"}'
```
