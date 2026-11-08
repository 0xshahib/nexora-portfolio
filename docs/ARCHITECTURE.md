# Architecture and security notes

## Public website
React renders the hero, about, education, skills, social and contact sections. The Three.js canvas is optional and configured through CMS site settings.

## CMS state
`CMSContext` manages data, browser cache, admin session state and API calls. The Express backend uses `data/cms-data.json` as a development-only store.

## API boundary
The migration adds a server-side authentication gate ahead of the imported legacy handlers. The gate:
- Uses environment-provided administrator credentials rather than sample passwords.
- Generates unpredictable short-lived bearer tokens.
- Blocks legacy auth routes, including email-only Google login.
- Restricts CMS mutations and private contact submissions to authenticated sessions.
- Omits administrator configuration and contact submissions from unauthenticated CMS responses.

## Remaining work before production
Replace the legacy routes entirely; use password hashing, rate limiting and durable session storage; protect all state-changing and costly API operations; add schema validation and persistent storage. Static Vercel hosting does not run this Express server.

## Change policy
Commit meaningful, reviewable changes rather than manufacturing an artificial history. Credit upstream contributors.
