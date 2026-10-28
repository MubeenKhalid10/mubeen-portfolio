# Mubeen Khalid — Portfolio

Personal portfolio of **Mubeen Khalid**, Full-Stack Engineer (Python, React & AI Integration). It presents selected projects as case studies, along with background, skills, and contact details.

- GitHub: [@MubeenKhalid10](https://github.com/MubeenKhalid10)

## Features

- Home, Projects, About, and Contact pages
- Case study for each project: problem, solution, architecture, engineering decisions, and limitations
- Responsive, minimal editorial design with keyboard navigation and reduced-motion support
- Statically generated pages, with SEO metadata, `robots.txt`, and a sitemap

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript
- Tailwind CSS v4
- Motion and Lucide icons
- Geist and Source Serif 4 fonts

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types and run the TypeScript compiler |

## Project structure

```
src/
  app/          Routes (pages, metadata, sitemap, robots)
  components/   Layout, home, project, and UI components
  content/      Typed site and project content
  lib/          Helpers
  types/        Shared types
public/         Static assets
```

## License

© Mubeen Khalid. All rights reserved. The code and content in this repository are shared for viewing and reference only and may not be copied or reused without permission.
