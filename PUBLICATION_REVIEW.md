# Publication review — 2026-10-14

Development-source publication authorized by owner; no deployment. All original authored source/config files inspected. Existing origin unavailable (404); target account has no Le Lieu repository. Inspected source blobs do not match the previously inventoried target repositories.

## Verified

- Five reservation failure/privacy regression tests passed using synthetic inputs. Endpoint responds 503 without reading, saving or sending personal data.
- Strict TypeScript check passed. Final Next.js production build passed, including generated route/type checks. Linting was not run; unused lint tooling/config is omitted from the exact publication manifest.
- Official npm registry only, lifecycle scripts disabled during isolated dependency installation. Fresh dependency lock resolves stable React Three peer versions. React reduced-motion nullable type and GSAP cleanup return type fixed. Next.js 15.5.27, React 19.3.0, patched PostCSS 8.5.30 and selector parser 7.1.6 verified in dependency tree. Initial stale-lock/peer resolution errors and sandbox native compiler failure were resolved in a fresh isolated build tree.
- Generated files, original history, .env, node_modules, .next, customer data, images, and native binaries are not committed. All 30 original source-file hashes remain unchanged.

## Remaining issues and scope

Final npm audit reports five high findings: braces, chokidar, fast-glob, micromatch and Tailwind CSS, all linked to braces stack-exhaustion on attacker-controlled deeply nested patterns. Installed braces 3.0.3 has no compatible patched release reported. This package uses Tailwind 3.4.19 on trusted repository sources only; do not accept untrusted build/glob inputs or expose a build-as-a-service endpoint. Migrate to a tested supported build stack before production deployment. No blanket clean-dependency claim is made.

No browser/WebGL, mobile visual, full accessibility, external image/map requests, email delivery, live booking or production-hosting tests were performed. Gallery modal focus management and small-screen navigation need further usability work. Business details/menu and source-linked external media are unverified demo content; review RIGHTS.md. Source publication does not imply that a working reservation service exists.
