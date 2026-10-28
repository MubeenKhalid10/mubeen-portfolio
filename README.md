# Mubeen Khalid — Portfolio

Static-first portfolio built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Lucide icons, and Motion (hero fade-in only).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Checks

```bash
npm run typecheck    # next typegen + tsc --noEmit
npm run lint         # ESLint
npm run build        # production build
npm run start        # serve the production build
```

## Update content

| What | Where |
| --- | --- |
| Name, headline, about, education, experience, LinkedIn, email | `src/content/profile.ts` |
| Project case studies, repo/demo links, screenshots | `src/content/projects.ts` |
| Skills (with the project that shows each) | `src/content/skills.ts` |
| Certifications, résumé file name | `src/content/profile.ts` |

- **LinkedIn / email:** set `linkedin` and `email` in `profile.ts`. While they are `null`, the links are hidden everywhere.
- **Résumé:** the PDF is `public/MUBEEN_KHALID.pdf` (name set by `resumeFile` in `profile.ts`). The "View Résumé" buttons open it in a new tab and appear only when the file exists, so there is never a broken link.
- **Education dates:** edit `education.period`.
- **Experience:** add entries to `experience` in `profile.ts`; they appear on `/about`.
- **Pages:** `/` (summary), `/projects`, `/projects/<slug>`, `/about`, `/contact`.
- **Screenshots:** save images under `public/images/leadflow/`, `contentpulse/`, or `ai-call-agent/` and add `{ src, alt, width, height, caption }` to that project's `screenshots`. The first screenshot replaces the diagram. Until then, captioned diagrams are shown (not presented as screenshots).
- **Repo / demo links:** add `links.repo` / `links.demo` only when verified and public. Cards show them only when set.

> Case-study text is limited to facts supplied about each project. Review it, and add measured results, test counts, and dataset sizes only when you can support them.

## Production URL (SEO)

Canonical URLs, Open Graph URLs, `sitemap.xml`, and the sitemap line in `robots.txt` are emitted only when a site URL is known. Set it in Vercel under *Settings → Environment Variables*:

```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically if this is unset. Logic lives in `src/lib/site.ts`.

## Deploy (after you approve)

```bash
git add -A && git commit -m "Initial portfolio"
# Create an empty repo named mubeen-portfolio on GitHub first, then:
git remote add origin https://github.com/MubeenKhalid10/mubeen-portfolio.git
git branch -M main
git push -u origin main
```

Then on Vercel: **Add New → Project → Import** `mubeen-portfolio` → keep the Next.js defaults → **Deploy**. Afterwards set `NEXT_PUBLIC_SITE_URL` and redeploy.

Verify the deployed site: all three case-study URLs load, `/projects/nope` shows the 404 page, `/robots.txt` and `/sitemap.xml` use the real URL, the résumé link works (if added), and the mobile menu opens and closes.
