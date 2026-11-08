# NEXORA — 3D Developer Portfolio

A responsive React + TypeScript portfolio with Three.js visuals, configurable themes, a content management interface, and an optional Express API.

> Adapted from [RezZone-Protfolio](https://github.com/rejonehossenriazcse/RezZone-Protfolio). Original author credit retained. Verify the upstream project's license and permissions before redistributing or using commercially.

## Technology
- React 19, TypeScript and Vite 6
- Tailwind CSS 4 and Motion
- Three.js 3D scene
- Express API for CMS persistence and optional Gemini integration

## Run locally
Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

Open **http://localhost:3000**.

## Build and check
```bash
npm run lint
npm run build
npm start
```

## Configure administrator access
Admin login is **disabled until** you set both `ADMIN_EMAIL` and a unique strong `ADMIN_PASSWORD` in your local `.env` or server environment. Never commit `.env`. Open `/#admin` to sign in.

The original application's browser-only password fallback and unverified Google-email login have been disabled. Administrative API writes require a server-issued bearer token. Sessions are held in server memory and expire after eight hours; restarting the server logs administrators out.

**Security and deployment:** This is a migration baseline, not a production security audit. Before public deployment, add persistent sessions, request rate limiting, CSRF protections where applicable, and a persistent database. The original API architecture stores data on disk and is not suitable for ephemeral serverless filesystems. `vercel.json` builds a static frontend only; it does **not** deploy the Express CMS backend. Static deployment displays the portfolio but does not provide working admin persistence or AI endpoints.

## Project layout
```text
src/components/portfolio/   Public-facing sections
src/components/admin/       CMS and editor interface
src/components/ThreeCanvas.tsx   Three.js visuals
src/context/CMSContext.tsx  Content state and API client
src/defaultData.ts          Default portfolio content
data/cms-data.json          Seed content
server.ts                   Express API
```

## Customisation
Edit the portfolio details in `src/defaultData.ts` and `data/cms-data.json`. The current profile contains starting information for Shahib; confirm all details and replace placeholder images and links before publishing.

## Attribution
Derived from the publicly accessible [RezZone-Protfolio](https://github.com/rejonehossenriazcse/RezZone-Protfolio) source. No license file was present in the inspected repository; public visibility does not by itself grant a reuse license. Obtain permission from the original author if needed.
