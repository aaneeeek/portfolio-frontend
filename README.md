# Portfolio frontend (Next.js 16 + Tailwind CSS 4)

Pages: `/` (biography, internships, education, influences, featured projects, contact) · `/events` · `/events/[slug]` · `/projects` · `/projects/[slug]` · `/skills`.
All content comes from the Django API, so you edit it in `/admin/` and the site updates within 5 minutes (cached to protect against the free server's cold start).

## Run locally
```bash
cp .env.example .env.local      # set NEXT_PUBLIC_API_URL to your Django URL
npm install
npm run dev                     # http://localhost:3000
npm run build && npm start      # production check
```

## Deploy on Vercel
1. Push this folder to GitHub, import it in Vercel.
2. Environment variables: `NEXT_PUBLIC_API_URL` = your Render API URL (no trailing slash), `NEXT_PUBLIC_WHATSAPP` = `237690487415`.
3. Add your subdomain in Vercel, then put that same address in the API's `FRONTEND_ORIGINS` and redeploy the API (otherwise the contact form is blocked by CORS).

## Things to know
- **Language**: the FR/EN button stores a cookie. First visit follows the browser language.
- **Theme**: dark by default; the button switches to light.
- **Icons**: open-licence (CC0) icons from the `simple-icons` package; fonts are self-hosted (OFL). Nothing is hotlinked.
- **CV button** appears once you upload a CV (English and/or French) on the Profile in `/admin/`.
- **Photo**: `public/photo.jpg` is used until you upload one on the Profile.
- **Not-found pages**: unknown project/event URLs show a 404 page, but the HTTP status is 200 (with a `noindex` tag) because the loading skeleton streams first.
