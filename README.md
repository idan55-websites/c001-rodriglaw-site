# Moria Website

Multilingual law firm website with contact forms and appointment booking.
Built with React, Vite, and Tailwind CSS, with an Express backend,
PostgreSQL, and Google Calendar integration.

## Local setup

Run these commands from this directory:

```sh
npm install
npm --prefix server install
cp server/.env.example server/.env
```

Fill in `server/.env` with your database, Google OAuth, email, and session
settings. For local development, set `NODE_ENV=development` and `PORT=3000`.
Create a frontend `.env` file:

```dotenv
VITE_API_URL=http://localhost:3000
VITE_MAPBOX_TOKEN=your_mapbox_token
```

Start the frontend and backend in separate terminals:

```sh
npm run dev
```

```sh
npm --prefix server run dev
```

## Commands

- `npm run build` — build the frontend for production.
- `npm run preview` — preview the production build locally.
- `npm run lint` — check frontend code with ESLint.

Frontend code lives in `src/`; backend routes and database migrations live
in `server/`.
