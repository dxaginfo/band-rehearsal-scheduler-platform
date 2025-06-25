# Rehearsal Scheduler

A web application for bands, orchestras, and musical groups to efficiently schedule rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on members' availability.

## Features

- **User Authentication and Profiles** - Create accounts, manage multiple bands, set availability preferences
- **Rehearsal Management** - Create rehearsal events with details, track patterns, view calendar
- **Availability System** - Mark weekly availability, handle exceptions, suggest optimal rehearsal times
- **Notification System** - Receive rehearsal reminders, get schedule change notifications
- **Attendance Tracking** - Track attendance, RSVP to invitations, view attendance reports
- **Rehearsal Notes and Resources** - Attach songs/sheets to rehearsals, add notes, create setlists

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Material-UI for UI components
- FullCalendar for calendar views
- Formik with Yup for form validation

### Backend
- Node.js with Express
- JWT Authentication
- PostgreSQL database
- Prisma ORM
- Redis for caching

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)
- Redis (v6+)

## Installation

### Clone the repository
```bash
git clone https://github.com/dxaginfo/band-rehearsal-scheduler-platform.git
cd band-rehearsal-scheduler-platform
```

### Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run migrate
npm run seed
npm run dev
```

### Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your API URL
npm run start
```

## Project Structure

```
/
├── frontend/                  # React frontend application
│   ├── public/                # Static files
│   ├── src/                   # Source code
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # React context providers
│   │   ├── redux/             # Redux store setup
│   │   ├── api/               # API service layer
│   │   ├── utils/             # Utility functions
│   │   └── App.tsx            # Main App component
│   └── package.json           # Frontend dependencies
│
├── backend/                   # Node.js Express backend
│   ├── src/                   # Source code
│   │   ├── controllers/       # Request controllers
│   │   ├── routes/            # API routes
│   │   ├── models/            # Database models
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   └── index.ts           # Entry point
│   ├── prisma/                # Prisma schema and migrations
│   └── package.json           # Backend dependencies
│
├── docker-compose.yml         # Docker services setup
└── package.json               # Root package.json for scripts
```

## API Documentation

API documentation is available at `/api/docs` when the server is running.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.