# Institute Management System - Spring Boot Backend

A comprehensive Spring Boot application for managing educational institutes with multiple modules including authentication, course management, student management, teacher management, fee management, exam management, and certification.

## 🚀 Features

### Core Modules
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin, Teacher, Student, and Staff roles
- **Course Management**: Categories, courses with enrollment capabilities
- **Student Management**: Student profiles, enrollment, and course tracking
- **Teacher Management**: Teacher profiles, course assignments, and expertise tracking
- **Center Management**: Multiple institute branches with capacity management
- **Enquiry Management**: Prospective student inquiry tracking and conversion
- **Fee Management**: Course fees, payment tracking, and online payment integration
- **Exam Management**: Exam creation, question banks, and result management
- **Certification**: Digital certificate generation and verification

### Technical Features
- **Spring Boot 3.2.0**: Latest stable version with Java 17
- **H2 Database**: In-memory database for development and testing
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions for different user types
- **RESTful APIs**: Well-structured REST endpoints with proper HTTP methods
- **Validation**: Comprehensive input validation using Bean Validation
- **Exception Handling**: Global exception handler with consistent error responses
- **Swagger/OpenAPI**: Interactive API documentation
- **Audit Fields**: Automatic timestamp and user tracking
- **Test Data**: Pre-populated database with sample data

## 🛠️ Technology Stack

- **Backend**: Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Database**: H2 Database (In-Memory)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: BCrypt password encryption
- **Documentation**: Swagger/OpenAPI 3
- **Build Tool**: Maven
- **Java Version**: 17

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd institute-management-system
```

### 2. Build the Project
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access the Application
- **API Base URL**: `http://localhost:8080/api`
- **Swagger UI**: `http://localhost:8080/api/swagger-ui.html`
- **H2 Console**: `http://localhost:8080/api/h2-console`

## 🔐 Default Credentials

The system comes with pre-configured test users:

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| admin | admin123 | ADMIN | Full system access |
| teacher | teacher123 | TEACHER | Course and exam management |
| student | student123 | STUDENT | Course enrollment and exam access |

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <jwt-token>
```

### Course Management

#### Get All Courses
```http
GET /api/courses
Authorization: Bearer <jwt-token>
```

#### Create Course (Admin/Staff only)
```http
POST /api/courses
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Advanced Java Programming",
  "description": "Advanced Java concepts and best practices",
  "categoryId": 1,
  "durationHours": 80,
  "fees": 1499.99,
  "platforms": "Online, Classroom"
}
```

### Student Management

#### Get Student Profile
```http
GET /api/students/profile
Authorization: Bearer <jwt-token>
```

#### Enroll in Course
```http
POST /api/students/enroll
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "courseId": 1
}
```

### Exam Management

#### Get Assigned Exams
```http
GET /api/exams/assigned
Authorization: Bearer <jwt-token>
```

#### Submit Exam Answer
```http
POST /api/exams/submit
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "examId": 1,
  "questionId": 1,
  "answer": "Java is an object-oriented programming language"
}
```

## 🏗️ Project Structure

```
src/main/java/com/gdsc/
├── auth/                    # Authentication & Authorization
│   ├── config/             # Security configuration
│   ├── controller/         # Auth endpoints
│   ├── dto/               # Data transfer objects
│   ├── entity/            # User and Role entities
│   ├── filter/            # JWT authentication filter
│   ├── repository/        # Data access layer
│   ├── service/           # Business logic
│   └── util/              # JWT utilities
├── center/                 # Center/Branch management
├── certification/          # Certificate management
├── common/                 # Shared components
│   ├── entity/            # Base entity
│   ├── exception/         # Global exception handling
│   └── ApiResponse.java   # Standard response format
├── course/                 # Course management
├── enquiry/                # Enquiry management
├── exam/                   # Exam management
├── fee/                    # Fee and payment management
├── student/                # Student management
└── teacher/                # Teacher management
```

## 🔒 Security Features

### Role-Based Access Control
- **ADMIN**: Full system access
- **TEACHER**: Course management, exam creation, grading
- **STAFF**: Administrative tasks, fee management
- **STUDENT**: Course enrollment, exam participation

### JWT Security
- Token expiration: 24 hours
- Secure token validation
- Refresh token mechanism
- Stateless authentication

### Password Security
- BCrypt encryption
- Minimum 6 characters
- Secure password storage

## 📊 Database Schema

The system uses H2 in-memory database with the following key entities:

- **Users**: Authentication and user management
- **Roles**: User role definitions
- **Courses**: Course information and metadata
- **Students**: Student profiles and enrollments
- **Teachers**: Teacher profiles and assignments
- **Centers**: Institute branches and locations
- **Exams**: Examination management
- **Fees**: Payment and fee tracking
- **Certifications**: Digital certificates

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Test Coverage
The application includes comprehensive test coverage for:
- Unit tests for services
- Integration tests for repositories
- Security tests for authentication
- API endpoint tests

## 🚀 Deployment

### Production Deployment
1. Update `application.yml` with production database credentials
2. Configure external database (PostgreSQL, MySQL)
3. Set environment variables for sensitive data
4. Build and deploy using your preferred method

### Docker Deployment
```bash
# Build Docker image
docker build -t institute-management-system .

# Run container
docker run -p 8080:8080 institute-management-system
```

## 📝 API Response Format

All API responses follow a consistent format:

```json
{
  "status": "SUCCESS",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "timestamp": "2024-01-01T12:00:00"
}
```

## 🔍 Error Handling

The system provides comprehensive error handling:

- **400 Bad Request**: Validation errors, invalid input
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

## 📈 Monitoring and Logging

- **Logging**: Comprehensive logging with different levels
- **Health Checks**: Built-in health check endpoints
- **Metrics**: Application metrics and performance monitoring

## 🔧 Configuration

### Application Properties
```yaml
# Database Configuration
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: password
  
  # JPA Configuration
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true

# JWT Configuration
jwt:
  secret: your-secret-key
  expiration: 86400000 # 24 hours

# Swagger Configuration
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

### Environment Variables
```bash
# Database
export DB_URL=jdbc:postgresql://localhost:5432/ims
export DB_USERNAME=ims_user
export DB_PASSWORD=ims_password

# JWT
export JWT_SECRET=your-production-secret-key
export JWT_EXPIRATION=86400000

# Server
export SERVER_PORT=8080
export SERVER_CONTEXT_PATH=/api
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <process_id> /F
```

#### 2. Database Connection Issues
- Verify database credentials
- Check if database service is running
- Ensure database exists and is accessible

#### 3. JWT Token Issues
- Verify JWT secret is properly configured
- Check token expiration settings
- Ensure proper token format in requests

#### 4. Build Issues
```bash
# Clean and rebuild
mvn clean install

# Update dependencies
mvn dependency:resolve
```

## 🔄 Database Migrations

### H2 to Production Database
1. Export data from H2
2. Create production database schema
3. Import data to production database
4. Update application configuration

### Schema Updates
```sql
-- Example: Add new column to users table
ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255);

-- Example: Create index for performance
CREATE INDEX idx_users_email ON users(email);
```

## 📊 Performance Optimization

### Database Optimization
- Use appropriate indexes
- Optimize queries with proper joins
- Implement connection pooling
- Use database-specific optimizations

### Application Optimization
- Enable caching where appropriate
- Use pagination for large datasets
- Implement async processing for heavy operations
- Monitor and optimize memory usage

## 🔐 Security Best Practices

### Production Security Checklist
- [ ] Change default passwords
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Use secure headers
- [ ] Enable audit logging
- [ ] Regular security updates

### Security Headers
```java
@Configuration
public class SecurityHeadersConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers()
                .frameOptions().deny()
                .contentTypeOptions()
                .and()
                .httpStrictTransportSecurity()
                .and()
                .contentSecurityPolicy("default-src 'self'");
        return http.build();
    }
}
```

## 📚 Additional Resources

### Documentation
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Security Reference](https://docs.spring.io/spring-security/site/docs/current/reference/html5/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)

### Community
- [Spring Forums](https://forum.spring.io/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-boot)
- [GitHub Issues](https://github.com/spring-projects/spring-boot/issues)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation and examples

## 🔮 Future Enhancements

- **Microservices**: Break down into smaller, focused services
- **Advanced Analytics**: Student performance analytics and reporting
- **Integration**: Third-party LMS and payment gateway integration
- **AI Features**: Intelligent course recommendations and automated grading
- **Multi-tenancy**: Support for multiple institutes
- **Real-time Communication**: WebSocket-based chat and notification system

---

**Note**: This is a comprehensive institute management system designed for educational institutions. The system is production-ready with proper security measures, validation, and error handling.
