# Delta Calculator - Surprised vs Digital Span

## Project Overview
- **Name**: Delta Calculator
- **Goal**: Track financial balance between project costs and payments received from Digital Span
- **Features**: Real-time delta calculation, project management, payment tracking, interactive dashboard

## Current Status
✅ **ACTIVE** - Fully functional application deployed and running

## URLs
- **Production**: https://3000-ibxu2wx0vq36ye5wqu9zg-6532622b.e2b.dev
- **API Health**: https://3000-ibxu2wx0vq36ye5wqu9zg-6532622b.e2b.dev/api/delta
- **GitHub**: (Repository to be configured)

## Current Financial Summary
Based on your provided data:
- **Total Projects**: ₹10,66,000 (34 projects)
- **Total Received**: ₹8,84,804 (13 payments)
- **Delta Amount**: ₹-1,81,196 (**PENDING**)
- **Status**: Digital Span owes ₹1,81,196 to Surprised

## Features Completed ✅

### 1. Dashboard & Analytics
- **Real-time Delta Calculation**: Automatically calculates excess/pending amounts
- **Visual Status Indicators**: Color-coded positive (green) vs negative (red) deltas
- **Financial Summary Cards**: Total projects, payments, delta amount, and status
- **Interactive Tables**: Scrollable project and payment lists with detailed information

### 2. Data Management
- **Project Tracking**: All 34 projects with amounts and descriptions loaded
- **Payment History**: Complete payment history from Sept 2024 to Sept 2025
- **Add New Projects**: Modal form to add new projects with validation
- **Add New Payments**: Modal form to add monthly payments
- **Data Persistence**: All data stored in Cloudflare D1 SQLite database

### 3. API Endpoints
- **GET /api/projects** - Retrieve all projects with amounts
- **GET /api/payments** - Retrieve all payment records by month  
- **GET /api/delta** - Calculate current financial balance
- **POST /api/projects** - Add new project entries
- **POST /api/payments** - Add new payment records
- **POST /api/delta/save** - Save current delta calculation to history

### 4. User Experience
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Auto-refresh**: Data refreshes every 5 minutes automatically
- **Success/Error Messages**: Real-time feedback for all user actions
- **Keyboard Navigation**: ESC key closes modals, full form validation

## Data Architecture

### Database Schema (Cloudflare D1 SQLite)
1. **projects** table: Stores all project information and amounts
2. **payments** table: Stores monthly payment records from Digital Span
3. **delta_calculations** table: Historical delta calculation snapshots

### Data Models
```sql
-- Projects: 34 entries totaling ₹10,66,000
-- Payments: 13 monthly entries totaling ₹8,84,804
-- Delta History: Calculation snapshots with timestamps
```

### Storage Services Used
- **Cloudflare D1**: Primary database for all financial data
- **Local Development**: SQLite with --local flag for development
- **Data Integrity**: Automatic timestamps and foreign key constraints

## User Guide

### Viewing Current Status
1. **Dashboard**: Open the application to see current financial summary
2. **Delta Status**: Green = Digital Span has paid excess, Red = Amount pending
3. **Project List**: Scroll through all completed and active projects
4. **Payment History**: View monthly payment history with descriptions

### Adding New Data
1. **Add Project**: Click "Add Project" → Fill form → Submit
   - Enter project name, amount (₹), and description
   - All amounts are automatically converted and stored
2. **Add Payment**: Click "Add Payment" → Select month → Enter amount
   - Use YYYY-MM format for months (e.g., 2025-10)
   - Add description for payment context

### Managing Calculations
1. **Auto-calculation**: Delta updates automatically when data changes
2. **Manual Save**: Click "Save Current Delta" to create historical snapshot
3. **Data Refresh**: Click "Refresh" button or wait for auto-refresh (5 min)

## Technical Stack
- **Backend**: Hono framework on Cloudflare Workers
- **Frontend**: Vanilla JavaScript with Tailwind CSS
- **Database**: Cloudflare D1 (SQLite) 
- **Deployment**: Cloudflare Pages
- **Development**: Vite build system, PM2 process manager

## Development
- **Local Environment**: `npm run dev:sandbox` (requires D1 local setup)
- **Build**: `npm run build` (creates dist/ directory)
- **Database**: `npm run db:migrate:local` and `npm run db:seed`
- **Process Manager**: PM2 for service management

## Next Steps Recommended
1. **GitHub Integration**: Set up repository for version control
2. **Cloudflare Deployment**: Deploy to production Cloudflare Pages
3. **Data Export**: Add CSV/Excel export functionality for reports
4. **Advanced Analytics**: Monthly/yearly trend analysis and charts
5. **Project Categories**: Group projects by type (Website, SEO, Maintenance)
6. **Client Management**: Support multiple clients beyond Digital Span
7. **Automated Reminders**: Email notifications for pending payments

## Quick Delta Summary
**Current Financial Position (as of Sept 2025)**:
- Digital Span **owes** ₹1,81,196 to Surprised
- This represents outstanding balance for completed projects
- Last payment received: Sept 2025 (₹1,25,000)
- Largest pending projects: Greytec SEO (₹1,20,000), Rodanco (₹70,000), Test Site (₹70,000)

## Contact & Support
- **Company**: Surprised
- **Client**: Digital Span
- **Tool Purpose**: Internal financial tracking and delta calculations
- **Last Updated**: September 22, 2025