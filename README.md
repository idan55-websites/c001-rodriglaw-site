# Moria Website

Multilingual law firm website for Moria Rodrig. Online contact forms and appointment booking are currently disabled; visitors can contact the office by phone, email or WhatsApp.
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

- `npm run build` — build the frontend and prerender all six public pages in Hebrew, including SEO metadata, structured data, robots.txt and sitemap.xml.
- `npm run preview` — preview the production build locally.
- `npm run lint` — check frontend code with ESLint.

Frontend code lives in `src/`; backend routes and database migrations live
in `server/`.

## SEO and accessibility

The canonical domain is `https://www.rodriglaw.com`, configured in `src/utils/seo.js`,
matching the live redirect from `rodriglaw.com`. The home-page HTML references the
square 192px MR favicon directly on that host. `/favicon.ico` remains available
for browser fallback.
Hebrew is the default public language; a visitor's chosen language is saved locally.
The build generates a complete HTML document for each public route so crawlers can
read the content without JavaScript. `vercel.json` routes clean URLs to those
HTML files; the preview server mirrors these rewrites. Deploy the entire `dist/`
directory with these rewrites, rather than only `dist/index.html`.

After publishing, verify `rodriglaw.com` in Google Search Console, submit
`https://www.rodriglaw.com/sitemap.xml`, and request indexing of the main pages.
Check the live canonical URLs and robots.txt after deployment. Google decides
whether, when and where to index/rank pages; neither rapid indexing nor a first
position can be guaranteed. A verified Google Business Profile with consistent
office name, address and phone can complement the website's local visibility.

The accessibility dialog supports keyboard navigation, high contrast, text
sizes from 100–200%, reduced motion, link underlining, a readable font, text
spacing and grayscale. Preferences are stored locally when storage is available.
The statement includes the office's contact details and known limitations.
An assistive-technology review and verified physical-office accessibility
arrangements remain necessary before claiming full compliance with Israeli
accessibility requirements. See `docs/seo-accessibility-update.md` for evidence.
