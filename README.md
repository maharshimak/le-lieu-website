# Le Lieu website — development source

Next.js / React restaurant presentation with a Three.js hero, animated sections, menu, gallery, location, and reservation form UI. This is a sanitized local development snapshot; no live site was changed or deployed.

## Setup

Use Node.js 22 LTS or newer supported Node.js release and npm. Run `npm ci --ignore-scripts`, then `npm run typecheck` and `npm run build`. Run `npm run dev` for local development. Dependencies install only from the official npm registry; native optional packages may require platform support. Do not treat the development server as production hosting.

## Reservation status

The original handler returned a booking confirmation without saving or notifying anybody. The published handler instead returns HTTP 503 before reading the body, with no personal-data storage or external calls. The UI explicitly identifies the form as a demo. A real backend with validation, spam controls, retention rules, email delivery and tested failure handling is required before accepting reservations.

## Architecture and limits

`app/page.tsx` composes `components/sections`; `app/layout.tsx` provides metadata; `app/api/reservation/route.ts` is the intentionally unavailable booking endpoint. `lib/` holds shared constants/utilities. Tailwind provides styles. The scene is dynamically loaded and has a reduced-motion/mobile fallback. External HDR downloads were removed. Gallery images and map remain external URL references, with no copies committed. See RIGHTS.md.

Publication verification and remaining build/browser limitations are recorded in PUBLICATION_REVIEW.md. No payment integration, booking database, mail transport or end-to-end business flow is implemented. Originals, original Git history, dependencies and build artifacts were excluded.
