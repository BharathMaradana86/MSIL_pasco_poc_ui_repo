# MSIL Automated Workshop System

A comprehensive React web application for managing automated workshop operations, vehicle tracking, and customer communication.

## Features

### 1. Central Dashboard
- Real-time vehicle status tracking
- KPI metrics and analytics
- Live alerts and notifications
- Vehicle tracking ticker
- Bay status overview
- Recent activity feed

### 2. Vehicle Tracking System (VTS)
- Vehicle stage tracking (Main Entry, Washing, Floor Entry/Exit, Bay, Exit)
- ANPR (Automatic Number Plate Recognition) management
- Bay management with utilization tracking
- Exception handling for edge cases

### 3. Real-Time Monitoring
- Vehicle tracking logs with filtering
- Live camera feeds
- Vehicle status ticker

### 4. Reports & Analytics
- Main Entry Reports (ANPR dumps, time slot distribution, appointment vs walk-in)
- Job Card Reports (opening time, pending JCs)
- Bay Efficiency Reports (utilization, duration)
- Vehicle Tracking Reports (time per stage, delays)

### 5. Customer Communication
- Automated customer updates (SMS, WhatsApp, App notifications)
- Message templates management
- Message history tracking

### 6. 360° Vehicle Assessment
- AI-based damage assessment
- Outer and underbody damage detection
- Assessment history

### 7. Administration
- User management
- Component management (cameras, displays, buzzers)
- Masters management
- Workflow configuration

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: React Icons
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── pages/                    # Page components
│   ├── Dashboard.tsx
│   ├── VehicleTracking.tsx
│   ├── RealTimeMonitoring.tsx
│   ├── Reports.tsx
│   ├── CustomerCommunication.tsx
│   ├── VehicleAssessment.tsx
│   └── Administration.tsx
├── components/               # React components
│   ├── Layout/              # Layout components (Header, Sidebar)
│   ├── Dashboard/           # Dashboard components
│   ├── VehicleTracking/     # Vehicle tracking components
│   ├── RealTimeMonitoring/  # Real-time monitoring components
│   ├── Reports/             # Report components
│   ├── CustomerCommunication/ # Customer communication components
│   ├── VehicleAssessment/   # Vehicle assessment components
│   └── Administration/      # Administration components
├── lib/                     # Utilities and API structure
│   └── api.ts              # API integration structure
├── App.tsx                  # Main app component with routing
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Key Features Implementation

### Vehicle Tracking Stages
- Main Entry
- Washing Entry/Exit
- Floor Entry/Exit
- Bay In/Out
- Final Washing
- Exit

### ANPR System
- 98%+ accuracy requirement
- Manual correction capability
- Non-standard plate handling
- Vehicle type detection (Maruti vs Non-Maruti)

### Bay Management
- Real-time bay status monitoring
- Bay type management (2-Tech, Express, Smart)
- Utilization tracking
- AI-driven insights

### Alerts & Notifications
- Vehicle entry without JC creation
- Washing completion without allocation
- Bay allocation without job start
- Delivery time deviation warnings

## API Integration

The application includes a structured API integration layer in `src/lib/api.ts`. Replace mock implementations with actual API endpoints:

- Vehicle Tracking API
- Dashboard API
- Customer Communication API
- Reports API
- Administration API
- Vehicle Assessment API

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## License

Internal Use Only - MSIL
