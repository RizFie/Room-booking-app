# Room Booking App

A web-based room and place reservation system built with Next.js for my Computer Science diploma internship project.

The application gives users a simple way to find a suitable room, check existing reservations, and submit bookings. It also provides an administrator area for managing the rooms, users, and booking approvals.

## Features

### For users

- Create an account and sign in securely
- View a personal dashboard with reservation statistics
- Browse available rooms and places, including descriptions, capacity, type, and images
- Check reservations on a calendar before selecting a date and time
- Submit a reservation with its purpose, date, and time
- View reservation details and status
- Cancel reservations
- Manage profile information

### For administrators

- View an overview of users, places, and reservations
- Monitor monthly booking activity and reservation counts by place
- Review pending reservations
- Confirm reservations
- Add, edit, and remove places
- Add, edit, and manage users
- View all reservations and their current status

## Technology stack

- [Next.js](https://nextjs.org/) 15 with the App Router
- [React](https://react.dev/) 19 release candidate
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- MySQL
- [Auth.js](https://authjs.dev/) / NextAuth for authentication
- [Syncfusion React Scheduler](https://www.syncfusion.com/react-components/react-scheduler) for the booking calendar
- [Recharts](https://recharts.org/) for dashboard charts
- [Zod](https://zod.dev/) for form validation

## Application structure

```text
src/
├── app/
│   ├── (auth)/           # Login and registration pages
│   ├── main/             # User-facing dashboard and booking pages
│   ├── admin/            # Administrator dashboard and management pages
│   └── api/auth/         # Auth.js route handler
├── components/           # Reusable UI components and forms
├── lib/                  # Prisma client, actions, validation, and shared types
├── auth.ts               # Auth.js configuration and route protection
└── middleware.ts         # Authentication middleware

prisma/
└── schema.prisma         # MySQL database schema
```

## Requirements

Before running the project, install:

- [Node.js](https://nodejs.org/) 20 or newer
- npm
- A MySQL database

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/RizFie/Room-booking-app.git
cd Room-booking-app
```

### 2. Install dependencies

```bash
npm install
```

This project uses Next.js 15 with a React 19 release candidate. If npm reports a peer-dependency conflict during installation, try:

```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables

Create a `.env` file in the project root for the database connection:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME"
```

Create a `.env.local` file for Auth.js:

```env
AUTH_SECRET="replace-with-a-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"
```

Generate an Auth.js secret with:

```bash
npx auth secret
```

Do not commit `.env` or `.env.local` to source control. Use separate values for development and production.

### 4. Generate Prisma Client and prepare the database

```bash
npx prisma generate
npx prisma db push
```

`prisma db push` applies the current schema from [`prisma/schema.prisma`](./prisma/schema.prisma) to the configured MySQL database. The project does not currently include a Prisma migrations directory.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run the project linter |

## User roles

New accounts are created with the `user` role by default. Administrator accounts use the `admin` role and can access the protected `/admin` area.

For local development, an administrator can be created or assigned directly in the `user` table. Handle this carefully and never expose database credentials or password hashes.

## Booking flow

1. Sign in or create a user account.
2. Open **Reserve** and select a room or place.
3. Use the calendar to review existing reservations.
4. Select a date, time, and booking purpose.
5. Submit the reservation.
6. An administrator reviews and confirms the reservation.
7. Track the reservation from the **Booking** page or user dashboard.

## Production deployment

Create a production build locally with:

```bash
npm run build
npm run start
```

When deploying, configure the production `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, and `AUTH_TRUST_HOST` values in the hosting provider's environment settings. The application can be deployed to platforms that support Next.js, such as [Vercel](https://vercel.com/), with a reachable MySQL database.

## Project background

This is my first Next.js project, created as part of my Computer Science diploma internship. It was an opportunity to learn and apply full-stack web development concepts including authentication, role-based access, relational database design, server-side data fetching, form validation, and responsive UI development.

## License

This project was created for educational and internship purposes.
