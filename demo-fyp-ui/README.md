# DigitForge AI

A frontend-only demonstration for a future GAN-based handwritten digit generator. The interface uses a parrot green accent theme and includes a landing page, demo registration and login, generation dashboard, history, pricing upgrade simulation, and settings.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Render deployment

The repository includes a Render Blueprint at `../render.yaml`. Create a Blueprint from the repository root. It configures a Node web service with `demo-fyp-ui` as its root directory, Node.js 22.20.0, `npm ci && npm run build` as its build command, and `npm start` as its start command. The existing `next start` script uses Render's supplied `PORT`; no custom server or application secrets are required.

Required application environment variables: none. Render supplies `PORT` for its web service. Do not configure this frontend as a static site: the app uses the Next.js server runtime.

Demo accounts, history, plans, and preferences are stored in each visitor's browser local storage. They are not shared across browsers or devices, are not a database, and can be changed or cleared by the visitor.

## Demo behavior

- Free accounts receive 10 tokens per local calendar day; each image costs 5 tokens and the daily limit is 2 images.
- The simulated Pro plan gives 100 daily tokens and a 20 image daily limit. The illustrative price is not a real offer.
- Generation uses typographic placeholders and local browser state. It does not run a GAN, call FastAPI, or connect to a database, payment provider, or external API.
- Account data, token usage, plan selection, and image history live in browser local storage. Passwords are stored as salted SHA-256 digests, but this is still not secure authentication. Local data can be inspected, changed, or erased by the browser user.
- Theme and generation preference settings are local to this browser.

## Checks

```bash
npm run lint
npm run build
```
