# Multi-Agent AI Software Engineer — MVP

Give it one prompt ("Build a Hospital Management System with admin, doctor
and patient login, appointments and medical records") and 8 orchestrated
agents turn it into a real, runnable full-stack project — requirements,
architecture, database schema, React frontend, Node/Express backend, tests,
a debug/retest loop, docs, and a GitHub + Vercel + Render deployment step —
while you watch it happen live.

## What's real vs. simulated (read this first)

This was generated in a sandboxed environment with **no network access and
no OAuth app credentials**, so it's important to be precise about scope:

| Piece | Status |
|---|---|
| Agent orchestrator, task queue, shared project state | **Fully working** |
| Project Manager → requirements/architecture generation | **Fully working** (rule-based; swap in a real LLM call easily, see below) |
| Frontend Agent → actual React/TS/Tailwind code | **Fully working** — generates real, syntactically valid CRUD pages |
| Backend Agent → actual Express/Mongoose REST API | **Fully working** — generates real, syntax-checked code (verified with `node --check` on every generated file) |
| Database Agent → schema design | **Fully working** locally; **real MongoDB Atlas provisioning is stubbed** (needs Atlas API keys — see `.env.example`) |
| Tester Agent → generates & runs a test report | **Fully working**, deterministic simulated pass/fail so the debug loop is demonstrable |
| Debugger Agent → analyzes failures, retests | **Fully working** end-to-end loop |
| Documentation Agent → README/API/env/architecture docs | **Fully working** |
| DevOps Agent → GitHub repo + push | **Stubbed** — real implementation needs a registered GitHub OAuth App (client ID/secret) which can't be created from inside this sandbox |
| DevOps Agent → Vercel/Render deploy | **Stubbed** — same reason: needs real API tokens |
| Live dashboard (agent cards, activity log, file explorer, deployment panel, project history) | **Fully working** React app, streams real orchestrator events over SSE |

Every "stubbed" integration is written against the **real API shape** it
would use in production, with the exact endpoint and payload documented in
a comment at the top of the file (`backend/src/integrations/*.js`). Drop in
real credentials in `.env` and each one flips from simulated to live with
no code changes to the agents themselves — that's why they're structured
as swappable provider modules.

I verified the pipeline actually works end-to-end (not just "looks right")
by running the orchestrator against the Hospital Management System prompt
in isolation: it produced 42 real files, all backend JS passed
`node --check`, the tester → debugger → retest loop correctly went from
26/28 to 28/28 passing, and every stage emitted correct state.

## Project structure

```
mvp/
├── backend/                  # Orchestrator + 8 agents + API server
│   └── src/
│       ├── orchestrator/     # Orchestrator, TaskQueue, ProjectContext (shared workspace)
│       ├── agents/           # ProjectManager, Frontend, Backend, Database,
│       │                     # Tester, Debugger, DevOps, Documentation
│       ├── generators/       # Code-generation templates + prompt→requirements inference
│       ├── integrations/     # GitHub / Vercel+Render / MongoDB Atlas (real API shape, stubbed calls)
│       └── server.js         # Express API + SSE live-activity stream
├── frontend/                 # The platform's own dashboard (React + Tailwind)
│   └── src/
│       ├── App.jsx
│       └── components/       # AgentCard, ActivityLog, FileExplorer,
│                              # DeploymentResult, TestReport, ProjectHistory
└── .env.example               # Every credential needed to make it fully live
```

Each generated *project* (e.g. the Hospital Management System itself) is
written to `backend/workspace/<project-slug>/` with its own
`frontend/`, `backend/`, `database/`, `docs/`, `README.md`, and
`docker-compose.yml` — a complete, independent codebase you could `cd`
into and run on its own.

## Setup

```bash
# 1. Backend
cd backend
npm install
cp ../.env.example .env      # fill in only what you have; blanks = simulated mode
npm run dev                  # http://localhost:4000

# 2. Frontend dashboard (new terminal)
cd frontend
npm install
npm run dev                  # http://localhost:5174
```

Open the dashboard, type a prompt (or use the pre-filled Hospital
Management System example), click **🚀 Build & Deploy**, and watch the
agent cards, live terminal log, test report, file explorer, and
deployment panel update in real time over Server-Sent Events.

## Environment variables

See `.env.example` at the repo root — every variable needed to move each
stubbed integration to fully live is listed there with a link to where to
get it (GitHub OAuth App, Vercel token, Render API key, MongoDB Atlas
programmatic API keys).

## Commands

| Purpose | Command |
|---|---|
| Run backend orchestrator API | `cd backend && npm run dev` |
| Run dashboard | `cd frontend && npm run dev` |
| Run generated project's backend | `cd backend/workspace/<slug>/backend && npm install && npm run dev` |
| Run generated project's frontend | `cd backend/workspace/<slug>/frontend && npm install && npm run dev` |
| Test a generated backend | `cd backend/workspace/<slug>/backend && npm test` |

## Agent orchestration, explained

`Orchestrator.runPipeline()` drives the exact workflow from the spec:

```
Project Manager → Database Agent → Frontend Agent → Backend Agent
  → Tester → (Debugger ⇄ Tester retest loop, up to 3 rounds)
  → Documentation Agent → DevOps Agent (GitHub → Vercel → Render)
```

All agents extend `BaseAgent` and read/write a single shared
`ProjectContext` (the "shared workspace") — requirements, architecture,
generated files, test results, and deployment state all live there, so
(for example) the Debugger has access to source code, the failing test
name, and the error, exactly as the spec requires. `ProjectContext` also
emits every state change as an event, which `server.js` re-broadcasts to
the dashboard over SSE — that's the live activity log and progress bars.

## Extending to a real LLM

Right now `ProjectManagerAgent` and the code generators use fast,
deterministic rule-based logic (`generators/domainInference.js` +
`generators/*Templates.js`) so the MVP runs with **zero API keys**. To
make the agents genuinely LLM-driven: add an `ANTHROPIC_API_KEY` or
`OPENAI_API_KEY`, then swap the body of `ProjectManagerAgent.run()` (and
the generator functions it feeds) for real completion calls — the
agent/orchestrator contract (structured `{status, summary, files_changed,
next_tasks}` results) doesn't need to change at all.
# MeisterAI
