# Database Setup Guide

## Quick Setup Options

### Option 1: Use SQLite (Easiest - No Installation Required)

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Run:
```bash
npx prisma db push
npx prisma generate
```

### Option 2: Use PostgreSQL Locally

1. **Install PostgreSQL**:
   - Download from: https://www.postgresql.org/download/windows/
   - Or use Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`

2. **Create Database**:
```sql
CREATE DATABASE lexassure;
```

3. **Update `.env`**:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lexassure"
```

4. **Run**:
```bash
npx prisma db push
npx prisma generate
```

### Option 3: Use Supabase (Free Cloud Database)

1. Go to https://supabase.com and create account
2. Create new project
3. Get connection string from Settings > Database
4. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

5. Run:
```bash
npx prisma db push
npx prisma generate
```

### Option 4: Use Neon (Free Serverless Postgres)

1. Go to https://neon.tech and create account
2. Create new project
3. Copy connection string
4. Update `.env`:
```env
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

5. Run:
```bash
npx prisma db push
npx prisma generate
```

## Current Issue

Your current setup uses Prisma Postgres which requires a running local server. The easiest fix is to:

1. **Switch to SQLite** (recommended for development):
   - No installation needed
   - Works immediately
   - Perfect for testing

2. **Or use a cloud database** (recommended for production):
   - Supabase or Neon offer free tiers
   - No local setup required
   - Production-ready

## Recommended: Switch to SQLite Now

Run these commands:

```bash
# 1. Update schema
# Change datasource in prisma/schema.prisma to:
# provider = "sqlite"
# url = "file:./dev.db"

# 2. Push schema
npx prisma db push

# 3. Generate client
npx prisma generate

# 4. Start dev server
npm run dev
```

## After Database is Connected

1. Visit http://localhost:3000
2. Click "Get Started" to register
3. Create your first assessment
4. Test the complete workflow

## Troubleshooting

### "Can't reach database server"
- Database isn't running
- Wrong connection string
- Firewall blocking connection

### "EPERM: operation not permitted"
- Close VS Code
- Delete `node_modules/.prisma` folder
- Run `npm install` again

### "P1012: URL must start with postgresql://"
- Using wrong URL format
- Switch to SQLite or use proper PostgreSQL URL

## Need Help?

Check the SETUP.md file for more detailed instructions.
