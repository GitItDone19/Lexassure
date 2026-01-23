# Lexassure Setup Guide

## Overview
Lexassure is an EU AI Act Compliance Platform that helps organizations assess and manage compliance with EU AI regulations.

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
cd Lexassure
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE lexassure;
```

3. Update `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/lexassure"
```

#### Option B: Prisma Accelerate (Cloud)
Use the existing connection string in `.env`:
```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=your_api_key_here"
```

### 3. Environment Variables
Copy `.env.example` to `.env` and update:

```env
# Database
DATABASE_URL="your_database_url_here"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_a_random_secret_here"
```

To generate a secret:
```bash
openssl rand -base64 32
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
Lexassure/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── assessments/  # Assessment CRUD
│   │   │   └── auth/         # Authentication
│   │   ├── auth/             # Auth pages (login/register)
│   │   ├── dashboard/        # Protected dashboard
│   │   │   ├── dashboard/    # Main dashboard
│   │   │   └── assessment/   # Assessment workflow
│   │   │       └── [id]/
│   │   │           ├── step1/  # System information
│   │   │           ├── step2/  # Risk assessment
│   │   │           ├── step3/  # Implementation
│   │   │           └── results/ # Results page
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── auth/             # Auth forms
│   │   ├── layout/           # Layout components
│   │   └── shared/           # Shared components
│   ├── lib/
│   │   ├── auth.ts           # NextAuth config
│   │   ├── prisma.ts         # Prisma client
│   │   └── validations.ts    # Zod schemas
│   └── types/                # TypeScript types
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Features

### 1. Authentication
- User registration with email/password
- Secure login with NextAuth.js
- Password hashing with bcrypt
- JWT-based sessions

### 2. Assessment Workflow
**Step 1: System Information**
- System name and description
- Intended purpose
- Target users
- Deployment context
- Data types processed
- Geographic scope

**Step 2: Risk Assessment**
- Risk category classification
- Human oversight measures
- Transparency measures
- Data governance practices
- Accuracy requirements
- Cybersecurity measures
- Record keeping procedures
- Conformity assessment

**Step 3: Implementation & Monitoring**
- Stakeholder engagement
- Impact assessment
- Risk mitigation strategies
- Ongoing monitoring plan
- Incident response procedures
- Documentation quality
- Training programs
- Continuous improvement

### 3. Dashboard
- Overview statistics
- Assessment list
- Progress tracking
- Compliance scores

### 4. Results & Reporting
- Overall compliance score
- Detailed findings
- Strengths and weaknesses
- Recommendations
- PDF export (coming soon)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Assessments
- `GET /api/assessments` - List all assessments
- `POST /api/assessments` - Create new assessment
- `GET /api/assessments/[id]` - Get assessment details
- `PUT /api/assessments/[id]` - Update assessment
- `DELETE /api/assessments/[id]` - Delete assessment

## Database Schema

### User
- id (String, Primary Key)
- name (String, Optional)
- email (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)
- assessments (Relation)

### Assessment
- id (String, Primary Key)
- status (String: IN_PROGRESS | COMPLETED)
- step1Data (JSON)
- step2Data (JSON)
- step3Data (JSON)
- classification (JSON)
- overallScore (Float, Optional)
- requirements (JSON)
- actionPlan (JSON)
- createdAt (DateTime)
- updatedAt (DateTime)
- completedAt (DateTime, Optional)
- userId (String, Foreign Key)
- user (Relation)

## Testing with Postman

### 1. Register User
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Create Assessment
```
POST http://localhost:3000/api/assessments
Content-Type: application/json
```

### 3. Update Assessment
```
PUT http://localhost:3000/api/assessments/{id}
Content-Type: application/json

{
  "step1Data": { ... },
  "status": "IN_PROGRESS"
}
```

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Ensure database exists

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Next Steps

1. **Complete Authentication Flow**
   - Add password reset
   - Email verification
   - OAuth providers (Google, GitHub)

2. **Enhanced Assessment**
   - Add file uploads
   - Implement PDF generation
   - Add assessment templates

3. **Reporting**
   - Generate detailed PDF reports
   - Export to CSV
   - Share assessments

4. **Collaboration**
   - Team workspaces
   - Role-based access
   - Comments and notes

5. **Compliance Updates**
   - Track regulatory changes
   - Automated notifications
   - Compliance calendar

## Support
For issues or questions, please check the documentation or contact support.
