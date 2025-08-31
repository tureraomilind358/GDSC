# 🏛️ GDSC Institute Management System - System Design Documentation

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Database Design](#database-design)
4. [API Design](#api-design)
5. [Security Implementation](#security-implementation)
6. [Recent Fixes Applied](#recent-fixes-applied)
7. [System Components](#system-components)
8. [Data Flow](#data-flow)
9. [Performance Considerations](#performance-considerations)
10. [Deployment Architecture](#deployment-architecture)
11. [Testing Strategy](#testing-strategy)
12. [Monitoring & Logging](#monitoring--logging)
13. [Future Enhancements](#future-enhancements)

---

## 🚀 System Overview

### Purpose
The GDSC Institute Management System is a comprehensive educational management platform designed to handle all aspects of institute operations including student management, teacher management, course administration, fee management, and examination systems.

### Key Features
- **Multi-tenant Architecture**: Supports multiple centers/institutes
- **Role-based Access Control**: Secure authentication and authorization
- **Scalable Design**: Built with modern Spring Boot architecture
- **RESTful APIs**: Comprehensive API endpoints for all modules
- **Real-time Notifications**: Automated alerts and updates
- **Reporting & Analytics**: Comprehensive reporting capabilities

### Target Users
- **Administrators**: Full system access and management
- **Staff**: Operational management and reporting
- **Teachers**: Course management and student interaction
- **Students**: Course enrollment and progress tracking

---

## 🏗️ Architecture Design

### Architectural Pattern
The system follows a **Layered Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer                              │
│  (Web App, Mobile App, Admin Panel, Third-party APIs)     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  API Gateway Layer                          │
│  (JWT Authentication, CORS, Rate Limiting, Load Balancing) │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Controller Layer                            │
│  (REST API Endpoints, Request Validation, Response Format) │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  Service Layer                              │
│  (Business Logic, Transaction Management, Data Processing) │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                Repository Layer                             │
│  (Data Access, JPA/Hibernate, Query Optimization)         │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Database Layer                              │
│  (PostgreSQL/MySQL, Proper Relationships, Indexing)       │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Backend Framework**: Spring Boot 3.x with Java 17+
- **Database**: PostgreSQL/MySQL with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **API Documentation**: Swagger/OpenAPI 3.0
- **Build Tool**: Maven
- **Containerization**: Docker
- **Testing**: JUnit 5, Mockito

---

## 📊 Database Design

### Entity Relationship Model

#### Core Entities

**User Entity** (Authentication & Authorization)
```java
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Teacher> teachers = new HashSet<>();
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Student> students = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();
}
```

**Teacher Entity** (Teacher Management)
```java
@Entity
@Table(name = "teachers")
public class Teacher extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Course> assignedCourses = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Center center;
}
```

**Student Entity** (Student Management)
```java
@Entity
@Table(name = "students")
public class Student extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Course> enrolledCourses = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Center center;
}
```

**Course Entity** (Course Management)
```java
@Entity
@Table(name = "courses")
public class Course extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private CourseCategory category;
    
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Teacher> assignedTeachers = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Student> enrolledStudents = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Center center;
}
```

### Relationship Types

| Relationship | Entities | Type | Description |
|--------------|----------|------|-------------|
| User ↔ Teacher | 1:1 | OneToOne | Each teacher has one user account |
| User ↔ Student | 1:1 | OneToOne | Each student has one user account |
| Center → Users | 1:N | OneToMany | Center can have multiple users |
| Center → Teachers | 1:N | OneToMany | Center can have multiple teachers |
| Center → Students | 1:N | OneToMany | Center can have multiple students |
| Course ↔ Teachers | M:N | ManyToMany | Courses can have multiple teachers |
| Course ↔ Students | M:N | ManyToMany | Courses can have multiple students |
| Fee → Student | N:1 | ManyToOne | Multiple fees can belong to one student |
| Fee → Course | N:1 | ManyToOne | Multiple fees can belong to one course |
| Payment → Fee | N:1 | ManyToOne | Multiple payments can belong to one fee |

### Database Schema Features
- **Audit Trail**: Base entity with created/updated timestamps
- **Soft Deletes**: Logical deletion support
- **Indexing**: Optimized query performance
- **Constraints**: Proper foreign key and unique constraints
- **Validation**: Bean validation at entity level

---

## 🌐 API Design

### RESTful API Standards

#### HTTP Methods
- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources

#### Response Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Error Handling
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### API Endpoints Structure

#### Authentication
```
POST /auth/login          - User login
POST /auth/register       - User registration
POST /auth/refresh        - Refresh JWT token
POST /auth/logout         - User logout
POST /auth/change-password - Change password
```

#### User Management
```
GET    /users             - Get all users
GET    /users/{id}        - Get user by ID
POST   /users             - Create new user
PUT    /users/{id}        - Update user
DELETE /users/{id}        - Delete user
```

#### Teacher Management
```
GET    /teachers          - Get all teachers
GET    /teachers/{id}     - Get teacher by ID
POST   /teachers          - Create new teacher
PUT    /teachers/{id}     - Update teacher
DELETE /teachers/{id}     - Delete teacher
GET    /teachers/search   - Search teachers
GET    /teachers/{id}/courses - Get teacher courses
```

#### Student Management
```
GET    /students          - Get all students
GET    /students/{id}     - Get student by ID
POST   /students          - Create new student
PUT    /students/{id}     - Update student
DELETE /students/{id}     - Delete student
GET    /students/search   - Search students
GET    /students/{id}/courses - Get enrolled courses
```

#### Course Management
```
GET    /courses           - Get all courses
GET    /courses/{id}      - Get course by ID
POST   /courses           - Create new course
PUT    /courses/{id}      - Update course
DELETE /courses/{id}      - Delete course
GET    /courses/search    - Search courses
GET    /courses/published - Get published courses
```

### API Security
- **JWT Authentication**: Token-based authentication
- **Role-based Authorization**: Method-level security with @PreAuthorize
- **CORS Configuration**: Cross-origin resource sharing
- **Rate Limiting**: API usage throttling
- **Input Validation**: Request parameter validation

---

## 🔐 Security Implementation

### Authentication Flow
1. **User Login**: Username/password authentication
2. **JWT Generation**: Server generates JWT token
3. **Token Storage**: Client stores token securely
4. **Request Authorization**: Token included in subsequent requests
5. **Token Validation**: Server validates token on each request

### Authorization Levels
- **ADMIN**: Full system access
- **STAFF**: Operational management access
- **TEACHER**: Course and student management
- **STUDENT**: Personal data and course access

### Security Features
- **Password Encryption**: BCrypt hashing algorithm
- **Session Management**: Secure session handling
- **CSRF Protection**: Cross-site request forgery prevention
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

---

## 🔧 Recent Fixes Applied

### Critical Issue Resolution
**Problem**: `@OneToOne` relationships not working in POST/CREATE APIs for all modules.

**Root Cause**: 
- DTOs missing `userId` fields for User relationships
- Service methods not handling entity relationships during creation/updates
- Missing repository dependencies in services

**Solutions Applied**:

#### 1. Teacher & Student Services
- Added `userId` field to DTOs
- Added `UserRepository` dependency
- Fixed `convertToEntity` methods to handle User relationships
- Updated `updateTeacher` and `updateStudent` methods

#### 2. Fee & Payment Services
- Added missing repository dependencies (`CourseRepository`, `StudentRepository`, `CenterRepository`)
- Fixed `convertToEntity` methods to handle all relationships
- Updated `updateFee` and `updatePayment` methods

#### 3. Course Service
- Added `CourseCategoryRepository` dependency
- Fixed `convertToEntity` method to handle Category relationships
- Updated `updateCourse` method

#### 4. User Entity Enhancement
- Added reverse `@OneToMany` relationships for Teacher and Student
- Added helper methods for managing relationships
- Proper cascade operations for entity lifecycle

### Code Changes Summary
```java
// Before (Broken)
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false, unique = true)
private User user; // Never populated

// After (Fixed)
// DTO includes userId field
private Long userId;

// Service properly handles relationship
if (dto.getUserId() != null) {
    User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    entity.setUser(user);
}
```

---

## 🧩 System Components

### Core Modules

#### 1. Authentication Module (`com.gdsc.auth`)
- **User Management**: User CRUD operations
- **Role Management**: Role-based access control
- **Security Configuration**: Spring Security setup
- **JWT Service**: Token generation and validation

#### 2. Student Management Module (`com.gdsc.student`)
- **Student Entity**: Student data model
- **Student Service**: Business logic for student operations
- **Student Controller**: REST API endpoints
- **Student Repository**: Data access layer

#### 3. Teacher Management Module (`com.gdsc.teacher`)
- **Teacher Entity**: Teacher data model
- **Teacher Service**: Business logic for teacher operations
- **Teacher Controller**: REST API endpoints
- **Teacher Repository**: Data access layer

#### 4. Course Management Module (`com.gdsc.course`)
- **Course Entity**: Course data model
- **Course Service**: Business logic for course operations
- **Course Controller**: REST API endpoints
- **Course Repository**: Data access layer

#### 5. Fee Management Module (`com.gdsc.fee`)
- **Fee Entity**: Fee data model
- **Payment Entity**: Payment data model
- **Fee Service**: Business logic for fee operations
- **Payment Service**: Business logic for payment operations

#### 6. Examination Module (`com.gdsc.exam`)
- **Exam Entity**: Exam data model
- **Question Entity**: Question data model
- **Exam Service**: Business logic for exam operations
- **Result Service**: Exam result processing

### Common Components

#### Base Entity (`com.gdsc.common.entity.BaseEntity`)
```java
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;
}
```

#### API Response Wrapper (`com.gdsc.common.ApiResponse`)
```java
@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, LocalDateTime.now());
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, LocalDateTime.now());
    }
}
```

---

## 🔄 Data Flow

### Request Processing Flow
1. **Client Request**: HTTP request to API endpoint
2. **Authentication**: JWT token validation
3. **Authorization**: Role-based access control
4. **Validation**: Request parameter validation
5. **Business Logic**: Service layer processing
6. **Data Access**: Repository layer operations
7. **Response**: Formatted API response

### Data Persistence Flow
1. **Entity Creation**: Service creates entity objects
2. **Relationship Mapping**: Related entities fetched and mapped
3. **Validation**: Entity-level validation
4. **Persistence**: JPA/Hibernate saves to database
5. **Transaction Management**: ACID compliance
6. **Audit Trail**: Timestamps and metadata updated

### Error Handling Flow
1. **Exception Occurrence**: Runtime or business logic errors
2. **Exception Catching**: Global exception handler
3. **Error Logging**: Structured error logging
4. **User Response**: User-friendly error messages
5. **Monitoring**: Error tracking and alerting

---

## ⚡ Performance Considerations

### Database Optimization
- **Indexing Strategy**: Proper database indexes on frequently queried fields
- **Query Optimization**: Efficient JPA queries with fetch joins
- **Connection Pooling**: HikariCP connection pool configuration
- **Lazy Loading**: Strategic use of FetchType.LAZY

### Caching Strategy
- **Application Cache**: In-memory caching for frequently accessed data
- **Database Cache**: Query result caching
- **HTTP Cache**: Response caching for static resources

### Scalability Features
- **Horizontal Scaling**: Stateless application design
- **Load Balancing**: Multiple application instances
- **Database Sharding**: Multi-tenant data separation
- **Microservices Ready**: Modular architecture for future decomposition

---

## 🚀 Deployment Architecture

### Containerization
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment Configuration
- **Development**: Local development setup
- **Staging**: Pre-production testing environment
- **Production**: Live production environment

### Infrastructure Requirements
- **Application Server**: Spring Boot embedded Tomcat
- **Database Server**: PostgreSQL/MySQL with proper sizing
- **Load Balancer**: Nginx or AWS ALB
- **Monitoring**: Application performance monitoring
- **Backup**: Automated database backups

---

## 🧪 Testing Strategy

### Testing Levels
1. **Unit Testing**: Individual component testing
2. **Integration Testing**: Component interaction testing
3. **API Testing**: End-to-end API testing
4. **Performance Testing**: Load and stress testing

### Testing Tools
- **JUnit 5**: Unit testing framework
- **Mockito**: Mocking framework
- **TestContainers**: Database testing
- **Postman**: API testing
- **JMeter**: Performance testing

### Test Coverage
- **Code Coverage**: Minimum 80% coverage requirement
- **API Coverage**: All endpoints tested
- **Business Logic**: Critical business scenarios covered
- **Security Testing**: Authentication and authorization tested

---

## 📊 Monitoring & Logging

### Application Monitoring
- **Health Checks**: Application health endpoints
- **Metrics**: Performance metrics collection
- **Alerting**: Automated alert notifications
- **Dashboard**: Real-time monitoring dashboard

### Logging Strategy
- **Structured Logging**: JSON format logging
- **Log Levels**: Appropriate log level usage
- **Centralized Logging**: Central log aggregation
- **Audit Logging**: Security event logging

### Performance Metrics
- **Response Time**: API response time monitoring
- **Throughput**: Request per second tracking
- **Error Rate**: Error percentage monitoring
- **Resource Usage**: CPU, memory, database usage

---

## 🔮 Future Enhancements

### Planned Features
1. **Real-time Notifications**: WebSocket-based notifications
2. **Mobile Application**: Native mobile apps
3. **Advanced Analytics**: Business intelligence dashboard
4. **Integration APIs**: Third-party system integration
5. **AI/ML Features**: Predictive analytics and recommendations

### Technical Improvements
1. **Microservices Migration**: Service decomposition
2. **Event-Driven Architecture**: Asynchronous processing
3. **GraphQL API**: Flexible data querying
4. **Multi-language Support**: Internationalization
5. **Advanced Security**: OAuth 2.0, 2FA implementation

### Scalability Improvements
1. **Horizontal Scaling**: Auto-scaling capabilities
2. **Database Optimization**: Advanced indexing and partitioning
3. **CDN Integration**: Content delivery network
4. **API Gateway**: Advanced routing and rate limiting
5. **Service Mesh**: Inter-service communication management

---

## 📝 Conclusion

The GDSC Institute Management System represents a robust, scalable, and secure educational management platform. With the recent fixes applied to resolve the `@OneToOne` relationship issues, the system now properly handles all entity relationships during creation and updates.

### Key Achievements
- ✅ **All Critical Issues Resolved**: @OneToOne relationships working correctly
- ✅ **Comprehensive Architecture**: Well-designed layered architecture
- ✅ **Security Implementation**: Robust authentication and authorization
- ✅ **API Design**: RESTful API with proper error handling
- ✅ **Database Design**: Proper entity relationships and constraints
- ✅ **Performance Optimization**: Efficient data access and caching

### System Status
**Status**: 🟢 **OPERATIONAL**  
**Version**: 2.0  
**Last Updated**: January 2024  
**Next Review**: March 2024  

The system is now ready for production deployment and can handle the complete institute management workflow efficiently and securely.

---

*Document Version: 2.0*  
*Last Updated: January 15, 2024*  
*Prepared By: GDSC Development Team*  
*Review Cycle: Quarterly*
