This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker Setup (Frontend)

This project now includes Docker support for both local development and production-style runs.

### Prerequisites

- Docker Desktop installed and running
- Docker Compose available (`docker compose`)

### Environment Variable

Set your API URL before running compose.

Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_API_URL="http://localhost:8080"
```

Or put it in a local `.env` file at project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Development Container (hot reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

App URL: `http://localhost:3000`

### Production-style Container

```bash
docker compose up --build -d
```

Check logs:

```bash
docker compose logs -f frontend
```

Stop:

```bash
docker compose down
```

### Files Added

- `Dockerfile` - multi-stage build (`deps`, `builder`, `runner`)
- `docker-compose.dev.yml` - development workflow with bind mount and polling
- `docker-compose.yml` - production-style run using built app
- `.dockerignore` - excludes local build/cache files from Docker context
