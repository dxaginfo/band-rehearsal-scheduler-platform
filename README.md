# Band Rehearsal Scheduler Platform

A comprehensive web application for managing band rehearsals, scheduling, and communication.

## Features

- **User Account Management**: Create accounts, log in, and manage profiles
- **Group Management**: Create and manage bands/groups
- **Rehearsal Scheduling**: Schedule rehearsals with time, location, and resources
- **Availability Tracking**: Set weekly availability and exceptions
- **Conflict Detection**: Automatically detect scheduling conflicts
- **Resource Sharing**: Share documents, music, and rehearsal notes
- **Attendance Management**: Track attendance for rehearsals
- **Smart Scheduling**: Suggest optimal rehearsal times based on member availability
- **Notifications**: Email and in-app notifications for rehearsal events
- **Mobile Responsive**: Accessible on all devices

## Technology Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Material UI for component library
- React Router for navigation
- Formik + Yup for form handling
- FullCalendar for calendar views
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM for database operations
- PostgreSQL for data storage
- Redis for caching and session management
- JWT for authentication
- Express middleware for security
- Swagger for API documentation

### DevOps
- Docker for containerization
- Docker Compose for local development
- GitHub Actions for CI/CD

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose (for local development)
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-platform.git
   cd band-rehearsal-scheduler-platform
   ```

2. Start with Docker Compose (recommended):
   ```
   docker-compose up
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend API on http://localhost:5000
   - PostgreSQL database on port 5432
   - Redis on port 6379
   - pgAdmin on http://localhost:8080

3. Manual Setup (if not using Docker):

   **Backend:**
   ```
   cd backend
   npm install
   cp .env.example .env  # Update with your configuration
   npm run migrate
   npm run dev
   ```

   **Frontend:**
   ```
   cd frontend
   npm install
   npm start
   ```

## API Documentation

When the backend is running, you can access the Swagger API documentation at:
http://localhost:5000/api/docs

## Project Structure

```
/
├── frontend/                   # React frontend application
│   ├── public/                 # Static files
│   └── src/                    # Source code
│       ├── components/         # UI components
│       ├── pages/              # Page components
│       ├── hooks/              # Custom React hooks
│       ├── context/            # React context providers
│       ├── redux/              # Redux store setup
│       ├── api/                # API service layer
│       ├── utils/              # Utility functions
│       └── App.tsx             # Main App component
│
├── backend/                    # Node.js Express backend
│   ├── src/                    # Source code
│   │   ├── controllers/        # Request controllers
│   │   ├── routes/             # API routes
│   │   ├── models/             # Database models
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/              # Utility functions
│   │   └── index.ts            # Entry point
│   └── prisma/                 # Prisma schema and migrations
│
├── docker-compose.yml          # Docker services setup
└── README.md                   # Project documentation
```

## Database Schema

The application uses a PostgreSQL database with the following main entities:
- Users
- Groups
- GroupMembers
- Rehearsals
- RehearsalAttendees
- WeeklyAvailability
- AvailabilityExceptions
- RehearsalResources
- Notifications

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

DX AG - dxag.info@gmail.com