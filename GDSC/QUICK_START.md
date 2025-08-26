# 🚀 Quick Start Guide - Institute Management System

Get the Institute Management System up and running in under 10 minutes!

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Backend Requirements
- **Java 17** or higher
- **Maven 3.6** or higher
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

### Frontend Requirements
- **Node.js 18** or higher
- **npm 9** or higher
- **Angular CLI 19**

## ⚡ Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GDSC
```

### 2. Start the Backend (2 minutes)
```bash
# Navigate to backend directory
cd .

# Build and run Spring Boot application
mvn spring-boot:run
```

**✅ Backend is running at:** `http://localhost:8080`

### 3. Start the Frontend (2 minutes)
```bash
# Open new terminal and navigate to frontend
cd institute-management-frontend

# Install dependencies
npm install

# Start development server
npm start
```

**✅ Frontend is running at:** `http://localhost:4200`

### 4. Access the System
- **Frontend Application**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **Swagger Documentation**: http://localhost:8080/api/swagger-ui.html
- **H2 Database Console**: http://localhost:8080/api/h2-console

## 🔐 Default Login Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | `admin` | `admin123` | Full system access |
| **Teacher** | `teacher` | `teacher123` | Course & exam management |
| **Student** | `student` | `student123` | Course enrollment & exams |

## 🧪 Test the System

### Quick API Test
```bash
# Test authentication (using curl or Postman)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Quick Frontend Test
1. Open http://localhost:4200 in your browser
2. Click "Login" 
3. Use admin credentials: `admin` / `admin123`
4. Explore the dashboard

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Backend Won't Start
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Mac/Linux

# Kill process if needed
taskkill /PID <process_id> /F  # Windows
kill -9 <process_id>           # Mac/Linux
```

#### Frontend Won't Start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues
- H2 console: http://localhost:8080/api/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## 📱 Quick Feature Tour

### 1. Authentication
- **Login/Logout**: JWT-based authentication
- **Role Management**: Admin, Teacher, Student, Staff
- **Password Security**: BCrypt encryption

### 2. Course Management
- **Categories**: IT, Management, Design, etc.
- **Course Creation**: Name, description, duration, fees
- **Enrollment**: Student course registration

### 3. Student Management
- **Profiles**: Personal information and academic history
- **Enrollments**: Course registration and progress
- **Exams**: Assigned examinations and results

### 4. Exam System
- **Question Banks**: MCQ and descriptive questions
- **Auto-evaluation**: Instant MCQ grading
- **Results**: Performance analytics and certificates

### 5. Multi-Center Support
- **Branch Management**: Multiple institute locations
- **Resource Allocation**: Center-specific courses and staff
- **Capacity Planning**: Student and teacher allocation

## 🚀 Development Workflow

### Backend Development
```bash
# Run with hot reload (if using IDE)
# Or restart manually
mvn spring-boot:run

# Run tests
mvn test

# Build for production
mvn clean package
```

### Frontend Development
```bash
# Start development server
npm start

# Build for production
npm run build:prod

# Run tests
npm test

# Lint code
npm run lint
```

## 📊 System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular 19    │    │   Spring Boot   │    │   H2 Database   │
│   Frontend      │◄──►│   3.2.0 +       │◄──►│   (In-Memory)   │
│   Port 4200     │    │   Java 17       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: Granular permissions
- **Password Encryption**: BCrypt with salt
- **API Protection**: Spring Security integration
- **CORS Configuration**: Cross-origin security

## 📈 Performance Features

- **Lazy Loading**: Angular modules loaded on demand
- **Connection Pooling**: Database optimization
- **Caching**: Application-level caching
- **Pagination**: Large dataset handling
- **Async Processing**: Non-blocking operations

## 🧪 Testing the Complete System

### 1. User Registration & Login
1. Register a new user
2. Login with credentials
3. Verify JWT token generation

### 2. Course Management
1. Create a course category
2. Add a new course
3. Assign teacher to course

### 3. Student Enrollment
1. Register a student
2. Enroll in a course
3. Verify enrollment status

### 4. Exam Creation
1. Create an exam
2. Add questions
3. Assign to students

### 5. Certificate Generation
1. Complete exam
2. Generate certificate
3. Verify certificate authenticity

## 🔧 Configuration Files

### Backend Configuration
- **`application.yml`**: Database, JWT, and server settings
- **`pom.xml`**: Dependencies and build configuration
- **`SecurityConfig.java`**: Security and CORS settings

### Frontend Configuration
- **`environment.ts`**: Development environment settings
- **`environment.prod.ts`**: Production environment settings
- **`angular.json`**: Build and deployment configuration

## 📚 Next Steps

### For Developers
1. **Explore the Codebase**: Review the project structure
2. **Run Tests**: Ensure all tests pass
3. **Customize**: Modify entities, services, or UI components
4. **Add Features**: Implement new modules or functionality

### For Administrators
1. **Configure Production**: Update environment settings
2. **Database Setup**: Configure production database
3. **Security Hardening**: Update JWT secrets and security settings
4. **Deployment**: Deploy to production environment

### For Users
1. **User Training**: Review user documentation
2. **Data Migration**: Import existing data
3. **User Onboarding**: Create user accounts and roles
4. **System Testing**: Verify all functionality works as expected

## 🆘 Need Help?

### Quick Support
- **Documentation**: Check the main README files
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions
- **Wiki**: Check project wiki for detailed guides

### Common Commands Reference
```bash
# Backend
mvn spring-boot:run          # Start backend
mvn test                     # Run tests
mvn clean package            # Build JAR

# Frontend
npm start                    # Start dev server
npm run build               # Build for production
npm test                    # Run tests
npm run lint                # Lint code
```

---

## 🎯 Success Checklist

- [ ] Backend running on port 8080
- [ ] Frontend running on port 4200
- [ ] Can access Swagger documentation
- [ ] Can login with admin credentials
- [ ] Can view dashboard
- [ ] Can access H2 console
- [ ] All tests passing

**🎉 Congratulations! You now have a fully functional Institute Management System running locally.**

---

**Need more help? Check the detailed documentation in `README.md`, `BACKEND_README.md`, and `PROJECT_OVERVIEW.md`**
