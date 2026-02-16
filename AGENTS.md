# AGENTS.md

Guide for AI agents working in this codebase.

## Project Overview

This is a **Next.js 16** application built with **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**. The main application is a cipher translator ("Tradutor de Cifras") that converts between symbols and letters based on a keyboard mapping scheme.

## Essential Commands

```bash
# Install dependencies
bun install

# Development server (runs on port 3000)
bun run dev

# Production build (creates standalone output)
bun run build

# Start production server
bun start

# Linting
bun run lint

# Database commands (Prisma with SQLite)
bun run db:push      # Push schema to database
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Create and apply migration
bun run db:reset     # Reset database
```

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui (new-york style)
- **Icons**: Lucide React
- **Database**: SQLite via Prisma ORM
- **Fonts**: Geist Sans, Geist Mono
- **Reverse Proxy**: Caddy (port 81 → 3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles with CSS variables
│   ├── layout.tsx          # Root layout with fonts and Toaster
│   ├── page.tsx            # Main cipher translator page
│   └── api/
│       └── route.ts        # Example API route
├── components/
│   └── ui/                 # shadcn/ui components (40+ components)
├── hooks/
│   ├── use-mobile.ts       # Mobile detection hook
│   └── use-toast.ts        # Toast notification system
└── lib/
    ├── db.ts               # Prisma client singleton
    └── utils.ts            # cn() utility for class merging

prisma/
└── schema.prisma           # Database schema (User, Post models)

db/
└── custom.db               # SQLite database file
```

## Code Conventions

### Imports
- Use `@/*` path alias for imports from `src/`
- Example: `import { cn } from "@/lib/utils"`

### Components
- shadcn/ui components use `"use client"` directive where needed
- Components export both the component and variants (e.g., `Button`, `buttonVariants`)
- Use `cn()` utility for merging Tailwind classes

### Styling
- Tailwind CSS 4 with CSS variables for theming
- Dark mode supported via `.dark` class
- Colors defined as CSS variables in `globals.css` using `oklch` color space
- Border radius uses CSS variables: `--radius-sm`, `--radius-md`, `--radius-lg`

### TypeScript
- `noImplicitAny: false` - explicit any is allowed
- Strict mode enabled
- JSX transform: `react-jsx`

### Database
- Prisma client imported from `@/lib/db` as `db`
- Uses singleton pattern to prevent multiple instances in development
- SQLite database stored at `db/custom.db`
- Environment variable `DATABASE_URL` required

## shadcn/ui Configuration

- **Style**: new-york
- **RSC**: enabled
- **Base color**: neutral
- **CSS variables**: enabled
- **Icon library**: Lucide

To add new components:
```bash
bunx shadcn@latest add <component-name>
```

## Production Deployment

The app is configured for standalone output:
1. `bun run build` creates `.next/standalone/` directory
2. Static files copied to `.next/standalone/.next/static/`
3. Public folder copied to `.next/standalone/public/`
4. Run with `NODE_ENV=production bun .next/standalone/server.js`

## Key Gotchas

1. **React Strict Mode**: Disabled in `next.config.ts` (`reactStrictMode: false`)

2. **TypeScript Build Errors**: Build ignores TypeScript errors (`ignoreBuildErrors: true`)

3. **ESLint**: Very relaxed configuration - many rules disabled including:
   - `@typescript-eslint/no-explicit-any: off`
   - `@typescript-eslint/no-unused-vars: off`
   - `react-hooks/exhaustive-deps: off`
   - `no-console: off`

4. **Port Configuration**:
   - Dev server: port 3000
   - Caddy proxy: port 81
   - Caddyfile supports dynamic port via `?XTransformPort=<port>` query param

5. **Logs**: Dev and production servers log to files (`dev.log`, `server.log`)

6. **Database Location**: SQLite file at `db/custom.db`, not in `prisma/` folder

## Available UI Components

The following shadcn/ui components are installed in `src/components/ui/`:

**Layout**: accordion, aspect-ratio, card, collapsible, resizable, scroll-area, separator, sidebar, tabs

**Forms**: button, checkbox, form, input, input-otp, label, radio-group, select, slider, switch, textarea, toggle, toggle-group

**Overlay**: alert-dialog, dialog, drawer, dropdown-menu, hover-card, menubar, navigation-menu, popover, sheet, tooltip, context-menu

**Data Display**: avatar, badge, breadcrumb, calendar, chart, progress, skeleton, table

**Feedback**: alert, sonner, toast, toaster

**Navigation**: command, pagination

**Other**: carousel (embla-carousel-react)

## Application-Specific Context

The main page (`src/app/page.tsx`) is a cipher translator with:
- Symbol-to-letter and letter-to-symbol conversion
- Interactive symbol keyboard for input
- Reference table showing all symbol-letter mappings
- Portuguese language UI
- Custom inline styles (not using Tailwind for the main app UI)
