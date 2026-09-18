# Nirman SETU — GIGPLATFORM for Construction

A **cooperative gig & infrastructure platform** connecting Workers, Customers, Professionals, Government and Corporate entities.

## Stack
- **Frontend:** React 18 + Vite (SPA, served from `dist/`)
- **Backend:** Express + MongoDB (Mongoose) in `server/`
- **Auth:** OTP (console / MSG91 / Twilio) + PIN, JWT sessions
- **Hosting:** single Render Web Service (all-in-one)

## Local development
```bash
# terminal 1 — backend (http://localhost:5000)
cd server && npm install && npm run dev

# terminal 2 — frontend (http://localhost:5173, proxies /api and /uploads)
npm install && npm run dev
```
Seed data: `cd server && npm run seed` (creates demo users + workers + tenders).
The server auto-seeds on first boot when the DB is empty.

### Demo accounts
| Role        | Mobile       | PIN  | OTP   |
|-------------|--------------|------|-------|
| Customer    | 9000000001   | 1234 | 123456|
| Professional| 9000000002   | 1234 |       |
| Government  | 9000000003   | 1234 |       |
| Corporate   | 9000000004   | 1234 |       |

## Environment variables (`server/.env`)
| Variable      | Purpose                                     | Default                    |
|---------------|---------------------------------------------|----------------------------|
| `MONGO_URI`   | MongoDB connection string                   | `mongodb://127.0.0.1:27017/nirman_setu` |
| `JWT_SECRET`  | token signing secret                        | random at deploy           |
| `JWT_EXPIRES` | token lifetime                              | `7d`                       |
| `CLIENT_URL`  | allowed CORS origin                         | `*`                        |
| `DEMO_MODE`   | allow OTP `123456` / skip real SMS          | true                       |
| `OTP_PROVIDER`| `console` / `msg91` / `twilio`              | console                    |

## Deploy (Render, free)
1. Push this repo to GitHub.
2. On Render → **New → Blueprint** → connect the repo.
3. Set environment variables:
   - `MONGO_URI` → your free MongoDB connection string (e.g. Atlas M0)
   - `CLIENT_URL` → `https://<your-app>.onrender.com`
4. Render runs: `npm install && npm run build && npm --prefix server install` then starts `node server/src/index.js`. It listens on the port Render assigns (`PORT`).
5. App is live at `https://<your-app>.onrender.com` — the backend serves the built SPA at `/` and the API under `/api`.

> Note: file uploads use the local filesystem and reset on redeploy (fine for demos; use Cloudinary/S3 for production persistence).

## Routes
- Customer: `/customer` (search, workers, request service, my requests)
- Professional: `/business/professional` (diary, photos, documents, work history)
- Government: `/business/government` (projects, tenders, applications, inspection, monitoring)
- Corporate: `/business/corporate` (profile, projects, portfolio, opportunities)