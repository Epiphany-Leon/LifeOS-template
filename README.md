# LifeOS Template

LifeOS Template is an Astro + Cloudflare (Pages/Workers + D1) project that combines four modules in one app:

- **Execution**: tasks and project management
- **Knowledge**: notes and synthesis
- **Lifestyle**: budget, expenses, and relationship records
- **Vitals**: reflection, principles, and AI-assisted chat

It includes an API layer built with Hono under `src/pages/api/[...path].ts` and uses a D1 database binding named `DB`.

## Tech Stack

- [Astro](https://astro.build/) (server output)
- [Cloudflare adapter for Astro](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Hono](https://hono.dev/) for API routing
- [Cloudflare D1](https://developers.cloudflare.com/d1/) for storage
- [Tailwind CSS](https://tailwindcss.com/)

## Prerequisites

Before running locally, make sure you have:

- **Node.js 18+** (Node 20+ recommended)
- **npm**
- A **Cloudflare account**
- **Wrangler** (installed via project dependencies)

## Clone and Setup

```bash
git clone <YOUR_REPOSITORY_URL>
cd LifeOS-template
npm install
```

### 1) Configure environment variables

This project includes `.env.example`.

```bash
cp .env.example .env
```

Update `.env` with real values:

- `DEEPSEEK_API_KEY` (you can change any other AI platform API)
- `CLOUDFLARE_API_TOKEN` (optional helper token)

### 2) Configure Cloudflare D1 binding

Edit `wrangler.json` and replace placeholder values:

- `database_id`: set your real D1 database ID
- Keep `binding` as `DB` (required by API code)

If you have not created the database yet:

```bash
npx wrangler d1 create lifeos-db
```

Then copy the generated `database_id` into `wrangler.json`.

### 3) Initialize local database schema

Apply SQL files to your local D1 instance:

```bash
npx wrangler d1 execute lifeos-db --local --file=db/schema.sql
npx wrangler d1 execute lifeos-db --local --file=db/update.sql
```

> Note: The template includes API endpoints for additional runtime data structures (for example, `connections` can also be reset via `/api/init-connections`). If you extend the API tables, keep your SQL schema in sync.

## Run Locally

```bash
npm run dev
```

Default local URL:

- `http://localhost:4321`

## Build and Preview

```bash
npm run build
npm run preview
```

## Deploy (Cloudflare Pages)

Build first:

```bash
npm run build
```

Then deploy the `dist` folder:

```bash
npx wrangler pages deploy dist
```

Make sure your production environment has:

- D1 binding `DB`
- Secret `DEEPSEEK_API_KEY`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build app to `dist/` |
| `npm run preview` | Preview built app |
| `npm run astro` | Run Astro CLI |
| `npm run clean:env_reset` | Kill local node/workerd processes and reset `.wrangler` cache |

## Project Structure

```text
.
├── db/
│   ├── schema.sql
│   └── update.sql
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── api/[...path].ts
│   │   ├── execution/
│   │   ├── knowledge/
│   │   ├── lifestyle/
│   │   ├── vitals/
│   │   └── index.astro
│   └── styles/
├── astro.config.mjs
├── wrangler.json
└── package.json
```

## Security Notes

- Do **not** commit real secrets (`.env`, `.dev.vars`, API keys, tokens).
- Keep `.env.example` as placeholders only.
- Do not commit build output (`dist/`) to source control.

## License

See `LICENSE` for details.
