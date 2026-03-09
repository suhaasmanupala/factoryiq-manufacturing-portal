# FactoryIQ - Manufacturing Excellence Portal

A modern, full-featured manufacturing operations intelligence portal built with React, TypeScript, and TailwindCSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg)

## 🎯 Overview

FactoryIQ is a comprehensive manufacturing portal that provides end-to-end visibility across R&D, NPI (New Product Introduction), production, quality, logistics, and after-sales service. The platform offers role-based access control, real-time monitoring, and advanced data management capabilities.

## ✨ Key Features

### Core Functionality
- 🔐 **Role-Based Access Control** - 8 user roles with customized permissions
- 📊 **Real-Time Dashboard** - Executive overview with KPIs and charts
- 📋 **Program Management** - Full CRUD operations for product lifecycle tracking
- 🏭 **Production Monitoring** - Work order tracking and production metrics
- ✅ **Quality Management** - NCR tracking and compliance workflows
- 🚚 **Supply Chain Visibility** - Supplier and shipment tracking
- 🔧 **Service Operations** - RMA management with full CRUD
- 📈 **Analytics & Reporting** - Interactive charts and data export

### UI/UX Features
- 🌓 **Dark/Light Theme** - Professional theme toggle with smooth transitions
- 🔍 **Advanced Search** - Real-time search with keyboard shortcuts (Ctrl+K)
- 🎯 **Smart Filters** - Multi-criteria filtering and sorting
- 💬 **Toast Notifications** - Success, error, warning, and info messages
- ⏳ **Loading Skeletons** - Professional loading states
- 📍 **Breadcrumb Navigation** - Easy navigation with clickable paths
- 🎨 **Empty States** - Beautiful empty state designs
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 🎭 **Smooth Animations** - Professional transitions and effects

### Data Management
- 💾 **LocalStorage Persistence** - Data persists across sessions
- 📤 **Export Functionality** - Export data to CSV
- 🔄 **Real-Time Updates** - Instant UI updates on data changes
- 🎲 **Mock Data** - 10 example programs and RMAs across all roles

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd factoryiq
```

2. **Install dependencies**
```bash
cd frontend
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The build output will be in the `frontend/dist` directory.

## 👥 Demo Accounts

### Customer Users
| Role | Email | Password | Access |
|------|-------|----------|--------|
| Engineering | engineer@customer.com | password123 | Programs, Production, Quality |
| Program Manager | pm@customer.com | password123 | All Programs, Production, Quality, Analytics |
| Quality | quality@customer.com | password123 | Quality, Production |
| Supply Chain | supplychain@customer.com | password123 | Supply Chain, Production |
| Service | service@customer.com | password123 | Service, Quality |

### Internal Users
| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@factoryiq.com | admin123 | Full System Access |
| Production | production@factoryiq.com | password123 | Production, Quality |
| Quality Engineer | qe@factoryiq.com | password123 | Quality, Production, Analytics |

## 📁 Project Structure

```
factoryiq/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── StatCard.tsx
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── ToastContext.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── Analytics.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Production.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── Quality.tsx
│   │   │   ├── Service.tsx
│   │   │   └── SupplyChain.tsx
│   │   ├── services/            # Data services
│   │   │   └── mockData.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
├── README.md
├── start.bat                    # Windows startup script
└── start.sh                     # Unix/Mac startup script
```

## 🎨 Features in Detail

### 1. Theme Toggle
- Light and dark mode support
- Smooth color transitions
- Persistent theme preference
- Toggle buttons on login and dashboard

### 2. Search & Filters
- Real-time search with debouncing
- Keyboard shortcut (Ctrl+K / Cmd+K)
- Multi-criteria filtering
- Status and health filters
- Combined search and filter

### 3. CRUD Operations
**Programs:**
- Create new programs with full form
- Edit existing programs
- Delete with confirmation
- Role-based visibility
- Export to CSV

**RMAs:**
- Create RMA requests
- Auto-generated RMA numbers
- Edit RMA details
- Delete with confirmation
- Role-based access

### 4. Data Visualization
- Interactive pie charts
- Bar charts with tooltips
- Production metrics
- Quality trends
- Shipment status

### 5. Notifications
- Success notifications (green)
- Error notifications (red)
- Warning notifications (orange)
- Info notifications (blue)
- Auto-dismiss with manual close

### 6. Loading States
- Skeleton loaders for cards
- Table skeletons
- Stat card skeletons
- Smooth pulse animations

### 7. Empty States
- Icon-based visuals
- Contextual messages
- Call-to-action buttons
- Different states for no data vs no results

### 8. Keyboard Shortcuts
- `Ctrl+K` / `Cmd+K` - Focus search
- `Esc` - Close modals
- `Tab` - Navigate forms
- `Enter` - Submit forms

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icons

### State Management
- React Context API
- LocalStorage for persistence

### Development Tools
- ESLint - Code linting
- TypeScript Compiler - Type checking
- Vite Dev Server - Hot reload

## 📊 Data Model

### Programs
```typescript
{
  id: string
  name: string
  code: string
  description: string
  status: 'active' | 'on_hold' | 'completed'
  health_indicator: 'green' | 'yellow' | 'red'
  start_date: string
  target_completion_date: string
  customer_name: string
  program_manager_name: string
  project_count: number
  created_by: string
}
```

### RMAs
```typescript
{
  id: string
  rma_number: string
  product_name: string
  serial_number: string
  issue_category: string
  issue_description: string
  status: 'submitted' | 'approved' | 'received' | 'in_repair' | 'completed' | 'rejected'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  request_date: string
  created_by: string
}
```

## 🎯 Role-Based Access

### Access Matrix
| Module | Admin | PM | Eng | Prod | QE | Quality | SC | Service |
|--------|-------|----|----|------|----|---------|----|---------|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Programs | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Production | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Quality | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Supply Chain | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Service | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Analytics | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

### Data Visibility
- **Admin**: Sees all data
- **Program Manager**: Sees all programs
- **Service**: Sees all RMAs
- **Other Roles**: See only their own data

## 🎨 Customization

### Theme Colors
Edit `frontend/tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding New Roles
Edit `frontend/src/services/mockData.ts`:

```typescript
export const hasAccess = (userRole: string, module: string): boolean => {
  const accessMatrix: Record<string, string[]> = {
    'your_new_role': ['dashboard', 'programs', ...],
    // ...
  }
  return accessMatrix[userRole]?.includes(module) || false
}
```

## 🧪 Testing

### Run TypeScript Check
```bash
cd frontend
npx tsc --noEmit
```

### Build Test
```bash
npm run build
```

### Development Server
```bash
npm run dev
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- ARIA labels on interactive elements
- Focus indicators
- High contrast colors

## 🚀 Deployment

### Using Vite Build

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting

### Environment Variables
No environment variables required for the current version (uses mock data).

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📧 Support

For support, please contact: support@factoryiq.com

## 🎉 Acknowledgments

- React Team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Recharts for data visualization

---

**Built with ❤️ by the FactoryIQ Team**

**Version 1.0.0** | **Last Updated: 2024**
