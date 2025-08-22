# Freelancer Finance Manager

A modern, responsive frontend application built with [Next.js](https://nextjs.org) to help freelancers manage their finances. This project focuses on creating an intuitive user interface for tracking income, expenses, and generating professional invoices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

### 📼 Dashboard
- **Financial Overview**: Visual cards showing income, expenses, and profit
- **Recent Transactions**: Quick view of latest financial activities
- **Charts & Analytics**: Interactive graphs for financial trends
- **Quick Actions**: Fast access to common tasks

### 💰 Income Management
- **Income Tracking Forms**: Add and edit income entries
- **Client-based Organization**: Group income by clients
- **Payment Status Tracking**: Mark payments as received/pending
- **Income Categories**: Organize by project types

### 📊 Expense Tracking
- **Expense Entry Forms**: Detailed expense input with categories
- **Receipt Upload Interface**: Drag-and-drop file uploads
- **Expense Categories**: Business, travel, equipment, etc.
- **Tax-deductible Marking**: Flag expenses for tax purposes

### 🧾 Invoice Generation
- **Invoice Builder**: Step-by-step invoice creation
- **Professional Templates**: Multiple invoice designs
- **Client Management**: Store and select client information
- **PDF Preview**: Real-time invoice preview

### 📈 Reporting Interface
- **Interactive Charts**: Income vs expenses visualization
- **Date Range Filters**: Custom period selection
- **Export Options**: Download reports as PDF/CSV
- **Tax Summary Views**: Organized data for tax preparation

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Mobile gesture support
- **Progressive Web App**: Installable on mobile devices
- **Offline Capability**: Basic functionality without internet

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand (for client-side state)
- **Date Handling:** date-fns
- **PDF Generation:** jsPDF + html2canvas
- **File Handling:** React Dropzone
- **Animations:** Framer Motion

## Prerequisites

- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freelancer-finance-manager.git
   cd freelancer-finance-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Getting Started

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Explore the interface**
   - Browse the dashboard
   - Try adding sample income/expense entries
   - Generate a test invoice
   - View the responsive design on different screen sizes

## Project Structure

```
freelancer-finance-manager/
├── app/                    # Next.js App Router
│   ├── (protected)/       # Main application pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── income/        # Income management
│   │   ├── expenses/      # Expense tracking
│   │   ├── invoices/      # Invoice generation
│   │   └── reports/       # Financial reports
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
│   ├── utils.ts          # Helper functions
│   ├── validations.ts    # Zod schemas
│   └── constants.ts      # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   ├── images/          # Images and icons
│   └── fonts/           # Custom fonts
└── styles/               # Additional CSS files
```

## Components

### Core Components
- **Dashboard**: Main overview with financial summary
- **IncomeForm**: Add/edit income entries
- **ExpenseForm**: Add/edit expense entries
- **InvoiceBuilder**: Step-by-step invoice creation
- **ReportViewer**: Display financial reports and charts

### UI Components
- **DataTable**: Sortable, filterable tables
- **Charts**: Various chart types (bar, line, pie)
- **Forms**: Reusable form inputs and validation
- **Modals**: Dialog boxes for actions
- **Cards**: Information display containers

### Layout Components
- **Sidebar**: Navigation menu
- **Header**: Top navigation bar
- **MobileNav**: Mobile-responsive navigation
- **Footer**: Page footer

## Styling

### Tailwind CSS Configuration
- Custom color palette for financial themes
- Responsive breakpoints
- Custom component classes
- Dark mode support

### Design System
- Consistent spacing and typography
- Accessible color contrasts
- Hover and focus states
- Loading and error states

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking

# Styling
npm run format       # Format code with Prettier
```

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Deploy automatically** on every push

### Static Export

```bash
# Generate static files
npm run build
npm run export

# Deploy static files to any hosting service
```

### Other Platforms
- **Netlify**: Connect repository and deploy
- **GitHub Pages**: Use static export
- **AWS S3**: Upload static files

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-component
   ```
3. **Make your changes**
   - Follow TypeScript best practices
   - Maintain responsive design
   - Add proper accessibility attributes
4. **Test your changes**
   - Check on multiple screen sizes
   - Verify keyboard navigation
   - Test with screen readers
5. **Submit a pull request**

### Development Guidelines
- Use TypeScript for type safety
- Follow component composition patterns
- Implement responsive design first
- Ensure accessibility compliance
- Write clean, readable code
- Use semantic HTML elements

---

**A modern frontend solution for freelancer financial management**

Built with ❤️ using Next.js and SCSS