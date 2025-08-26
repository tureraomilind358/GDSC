# Institute Management System

A comprehensive, production-ready Angular application for managing educational institutes, courses, students, exams, and certifications.

## 🚀 Features

### Core Features
- **User Management**: Multi-role authentication and authorization
- **Course Management**: Complete course lifecycle management
- **Student Management**: Student enrollment, progress tracking, and records
- **Exam Management**: Exam creation, scheduling, and result management
- **Centre Management**: Multi-centre support with facility management
- **Certification System**: Digital certificate generation and verification
- **Reporting & Analytics**: Comprehensive reporting and data analytics
- **File Management**: Document upload, storage, and management

### Advanced Features
- **Real-time Updates**: WebSocket integration for live updates
- **Offline Support**: Progressive Web App (PWA) capabilities
- **Multi-language Support**: Internationalization (i18n)
- **Theme Support**: Light/Dark mode and custom themes
- **Responsive Design**: Mobile-first responsive interface
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance Optimized**: Lazy loading, code splitting, and caching

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permission system
- **Two-Factor Authentication**: Enhanced security
- **CSRF Protection**: Cross-site request forgery protection
- **Content Security Policy**: XSS protection
- **Rate Limiting**: API request throttling

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Development](#development)
5. [Testing](#testing)
6. [Building](#building)
7. [Deployment](#deployment)
8. [API Integration](#api-integration)
9. [Architecture](#architecture)
10. [Contributing](#contributing)
11. [Support](#support)

## 🔧 Prerequisites

### System Requirements
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Angular CLI**: >= 19.0.0
- **Git**: >= 2.30.0

### Backend Requirements
- RESTful API server
- Database (PostgreSQL/MySQL/MongoDB)
- File storage service
- Email service
- SMS service (optional)

## 📦 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd institute-management-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment files
cp src/environments/environment.ts src/environments/environment.local.ts
cp src/environments/environment.staging.ts src/environments/environment.staging.local.ts
cp src/environments/environment.prod.ts src/environments/environment.prod.local.ts

# Edit environment files with your configuration
```

### 4. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:4200`

## ⚙️ Configuration

### Environment Configuration

#### Development Environment (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableDebug: true,
  // ... other settings
};
```

#### Production Environment (`environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.institute-management.com/api',
  enableDebug: false,
  // ... other settings
};
```

### Feature Configuration

The application supports extensive feature configuration:

```typescript
features: {
  enableNotifications: true,
  enableAnalytics: true,
  enablePWA: true,
  enableOfflineMode: true,
  enableRealTimeUpdates: true,
  enableFileUpload: true,
  enableExport: true,
  enableImport: true,
  enableBulkOperations: true,
  enableAdvancedSearch: true,
  enableFilters: true,
  enableSorting: true,
  enablePagination: true,
  enableInfiniteScroll: true,
  enableVirtualScroll: true,
  enableLazyLoading: true,
  enableCaching: true,
  enableCompression: true,
  enableGzip: true,
  enableBrotli: true
}
```

### Authentication Configuration

```typescript
auth: {
  tokenExpiry: 3600, // 1 hour
  refreshTokenExpiry: 604800, // 7 days
  enableRememberMe: true,
  enableAutoLogout: true,
  autoLogoutTime: 1800, // 30 minutes
  enableSessionTimeout: true,
  sessionTimeout: 3600, // 1 hour
  enableConcurrentSession: false,
  maxConcurrentSessions: 1,
  enablePasswordPolicy: true,
  passwordMinLength: 12,
  passwordRequireUppercase: true,
  passwordRequireLowercase: true,
  passwordRequireNumbers: true,
  passwordRequireSpecialChars: true,
  enableTwoFactorAuth: true,
  enableEmailVerification: true,
  enablePhoneVerification: true
}
```

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── core/               # Core services and guards
│   │   ├── auth/           # Authentication services
│   │   ├── guards/         # Route guards
│   │   ├── interceptors/   # HTTP interceptors
│   │   └── services/       # Core services
│   ├── features/           # Feature modules
│   │   ├── admin/          # Admin features
│   │   ├── candidate/      # Candidate features
│   │   ├── centre/         # Centre management
│   │   ├── certification/  # Certification system
│   │   └── examiner/       # Examiner features
│   ├── pages/              # Page components
│   ├── services/           # Business logic services
│   └── shared/             # Shared components and utilities
├── environments/           # Environment configurations
└── assets/                # Static assets
```

### Available Scripts

```bash
# Development
npm start                    # Start development server
npm run serve:prod          # Serve production build locally
npm run serve:staging       # Serve staging build locally

# Building
npm run build               # Build for development
npm run build:prod          # Build for production
npm run build:staging       # Build for staging
npm run analyze             # Analyze bundle size

# Testing
npm test                    # Run unit tests
npm run test:coverage       # Run tests with coverage
npm run e2e                 # Run end-to-end tests

# Code Quality
npm run lint                # Run linting
npm run lint:fix            # Fix linting issues

# Utilities
npm run clean               # Clean build artifacts
npm run postinstall         # Post-installation tasks
```

### Development Guidelines

#### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write meaningful commit messages
- Add JSDoc comments for public APIs

#### Component Development
```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit, OnDestroy {
  // Use OnPush change detection for better performance
  // Implement OnDestroy for cleanup
}
```

#### Service Development
```typescript
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  // Use proper error handling
  // Implement retry logic
  // Add proper typing
}
```

## 🧪 Testing

### Unit Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --include="**/example.component.spec.ts"

# Run tests in watch mode
npm test -- --watch
```

### E2E Testing
```bash
# Run E2E tests
npm run e2e

# Run E2E tests in headless mode
npm run e2e -- --headless
```

### Testing Guidelines
- Write tests for all components and services
- Maintain >80% code coverage
- Use meaningful test descriptions
- Mock external dependencies
- Test error scenarios

## 🏗️ Building

### Development Build
```bash
npm run build
```

### Production Build
```bash
npm run build:prod
```

### Staging Build
```bash
npm run build:staging
```

### Build Optimization
The production build includes:
- **Tree Shaking**: Removes unused code
- **Code Splitting**: Optimizes loading performance
- **Minification**: Compresses JavaScript and CSS
- **Compression**: Gzip and Brotli compression
- **Source Maps**: Disabled for production
- **Bundle Analysis**: Available via `npm run analyze`

## 🚀 Deployment

### Quick Deployment
```bash
# Build for production
npm run build:prod

# Deploy to your preferred platform
# See DEPLOYMENT.md for detailed instructions
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud, Azure
- **Traditional Hosting**: Nginx, Apache
- **Container Platforms**: Docker, Kubernetes

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔌 API Integration

### Backend API Requirements

The application expects a RESTful API with the following endpoints:

#### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

#### Users
```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

#### Courses
```
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id
```

#### Students
```
GET    /api/students
POST   /api/students
GET    /api/students/:id
PUT    /api/students/:id
DELETE /api/students/:id
```

#### Exams
```
GET    /api/exams
POST   /api/exams
GET    /api/exams/:id
PUT    /api/exams/:id
DELETE /api/exams/:id
```

#### Centres
```
GET    /api/centres
POST   /api/centres
GET    /api/centres/:id
PUT    /api/centres/:id
DELETE /api/centres/:id
```

#### Certifications
```
GET    /api/certifications
POST   /api/certifications
GET    /api/certifications/:id
PUT    /api/certifications/:id
DELETE /api/certifications/:id
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Error Handling
```typescript
interface ApiError {
  status: number;
  message: string;
  errors?: string[];
  timestamp: string;
}
```

## 🏛️ Architecture

### Application Architecture
- **Modular Design**: Feature-based module organization
- **Lazy Loading**: On-demand module loading
- **State Management**: Reactive state management with RxJS
- **Service Layer**: Centralized business logic
- **Component Architecture**: Reusable component system

### Technology Stack
- **Frontend Framework**: Angular 19
- **UI Library**: Angular Material
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI
- **Package Manager**: npm

### Key Libraries
- **Chart.js**: Data visualization
- **ng2-charts**: Angular chart components
- **file-saver**: File download functionality
- **xlsx**: Excel file handling
- **jspdf**: PDF generation
- **html2canvas**: Screenshot functionality
- **moment**: Date manipulation
- **date-fns**: Modern date utilities
- **lodash**: Utility functions
- **uuid**: Unique identifier generation

## 🤝 Contributing

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request
```

### Code Review Process
- All changes require code review
- Maintain code quality standards
- Ensure proper test coverage
- Follow commit message conventions

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: Contact the development team

### Common Issues
- **Build Failures**: Clear cache and reinstall dependencies
- **API Errors**: Check network connectivity and API endpoints
- **Performance Issues**: Run bundle analysis and optimize
- **Deployment Issues**: Verify environment configuration

### Debugging
```bash
# Enable debug mode
export DEBUG=true

# Check application logs
tail -f /var/log/application.log

# Monitor network requests
# Use browser developer tools
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Angular Material for the UI components
- All contributors and maintainers
- The open-source community

---

**Note**: This is a production-ready application. Please ensure proper testing and validation before deploying to production environments.
