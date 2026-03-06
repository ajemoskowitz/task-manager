# Task Manager

A portfolio project demonstrating a full-stack task management app built with FastAPI, SQLAlchemy, and React. Took about an hour with limited knowledge of the Python libraries used, though I don't know how much credit I deserve when Claude Code is so powerful.

## Apps

| App | Stack | Port |
|-----|-------|------|
| `apps/backend` | Python, FastAPI, SQLAlchemy, SQLite | 8000 |
| `apps/frontend` | React, TypeScript, Vite | 5173 |

## Getting started

**Prerequisites:** Node.js 18+, Python 3.9+

### 1. Install JS dependencies

```bash
npm install
```

### 2. Set up the Python backend

```bash
cd apps/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Run everything

From the repo root:

```bash
npm run dev
```

This starts both the backend (`:8000`) and frontend (`:5173`) via Turborepo.

> Note: the backend `dev` script assumes your virtualenv is activated. If you get a `uvicorn: command not found` error, activate the venv first (`source apps/backend/.venv/bin/activate`) then re-run `npm run dev`.

The frontend proxies `/tasks` requests to the backend, so no manual CORS configuration is needed in development.

## API

Interactive docs available at `http://localhost:8000/docs` when the backend is running.
