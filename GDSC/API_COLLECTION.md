# Institute Management System - API Collection

## Base URL
```
http://localhost:8080/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Module (`/auth`)

### 1.1 User Login
- **POST** `/auth/login`
- **Description**: Authenticate user and return JWT token
- **Access**: Public
- **Body**:
```json
{
  "username": "admin",
  "password": "admin"
}
```

### 1.2 User Registration
- **POST** `/auth/register`
- **Description**: Register new user and return JWT token
- **Access**: Public
- **Body**:
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "roles": ["STUDENT"]
}
```

### 1.3 Refresh Token
- **POST** `/auth/refresh`
- **Description**: Refresh JWT token
- **Access**: Authenticated users
- **Headers**: `Authorization: Bearer <token>`

### 1.4 User Logout
- **POST** `/auth/logout`
- **Description**: Logout user (client should discard token)
- **Access**: Authenticated users

---

## 2. Course & Category Module

### 2.1 Course Categories (`/course-categories`)

#### Get All Categories
- **GET** `/course-categories`
- **Access**: Public

#### Get Category by ID
- **GET** `/course-categories/{id}`
- **Access**: Public

#### Create Category
- **POST** `/course-categories`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "name": "Information Technology",
  "description": "IT related courses",
  "icon": "fas fa-laptop-code",
  "color": "#007bff"
}
```

#### Update Category
- **PUT** `/course-categories/{id}`
- **Access**: ADMIN, STAFF

#### Delete Category
- **DELETE** `/course-categories/{id}`
- **Access**: ADMIN

### 2.2 Courses (`/courses`)

#### Get All Courses
- **GET** `/courses`
- **Access**: Public

#### Get Course by ID
- **GET** `/courses/{id}`
- **Access**: Public

#### Create Course
- **POST** `/courses`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "name": "Java Programming",
  "description": "Learn Java from basics to advanced",
  "image": "java-course.jpg",
  "platforms": ["Online", "Classroom"],
  "duration": "3 months",
  "fees": 299.99,
  "discount": 10.0,
  "maxStudents": 50,
  "categoryId": 1,
  "centerId": 1
}
```

#### Update Course
- **PUT** `/courses/{id}`
- **Access**: ADMIN, STAFF

#### Delete Course
- **DELETE** `/courses/{id}`
- **Access**: ADMIN

#### Get Courses by Category
- **GET** `/courses/category/{categoryId}`
- **Access**: Public

#### Search Courses
- **GET** `/courses/search?keyword=java`
- **Access**: Public

---

## 3. Student Module (`/students`)

### Get All Students
- **GET** `/students`
- **Access**: ADMIN, STAFF

### Get Student by ID
- **GET** `/students/{id}`
- **Access**: ADMIN, STAFF, Owner

### Create Student
- **POST** `/students`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "2000-01-01",
  "gender": "FEMALE",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "enrollmentDate": "2024-01-15",
  "centerId": 1
}
```

### Update Student
- **PUT** `/students/{id}`
- **Access**: ADMIN, STAFF, Owner

### Delete Student
- **DELETE** `/students/{id}`
- **Access**: ADMIN

### Search Students
- **GET** `/students/search?keyword=john`
- **Access**: ADMIN, STAFF

---

## 4. Teacher Module (`/teachers`)

### Get All Teachers
- **GET** `/teachers`
- **Access**: ADMIN, STAFF

### Get Teacher by ID
- **GET** `/teachers/{id}`
- **Access**: ADMIN, STAFF, Owner

### Create Teacher
- **POST** `/teachers`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "firstName": "Dr. Robert",
  "lastName": "Johnson",
  "email": "robert@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1980-05-15",
  "gender": "MALE",
  "address": "456 Oak Ave",
  "city": "Boston",
  "state": "MA",
  "zipCode": "02101",
  "hireDate": "2020-08-01",
  "expertise": "Computer Science",
  "qualification": "Ph.D. Computer Science",
  "experience": 10,
  "salary": 75000.00,
  "centerId": 1
}
```

### Update Teacher
- **PUT** `/teachers/{id}`
- **Access**: ADMIN, STAFF, Owner

### Delete Teacher
- **DELETE** `/teachers/{id}`
- **Access**: ADMIN

### Search Teachers
- **GET** `/teachers/search?keyword=computer`
- **Access**: ADMIN, STAFF

### Get Teacher Courses
- **GET** `/teachers/{id}/courses`
- **Access**: Public

---

## 5. Center/Branch Module (`/centers`)

### Get All Centers
- **GET** `/centers`
- **Access**: Public

### Get Center by ID
- **GET** `/centers/{id}`
- **Access**: Public

### Create Center
- **POST** `/centers`
- **Access**: ADMIN
- **Body**:
```json
{
  "name": "Main Campus",
  "code": "MC001",
  "address": "789 University Blvd",
  "city": "Chicago",
  "state": "IL",
  "zipCode": "60601",
  "phone": "+1234567890",
  "email": "main@institute.com",
  "capacity": 500,
  "status": "ACTIVE"
}
```

### Update Center
- **PUT** `/centers/{id}`
- **Access**: ADMIN

### Delete Center
- **DELETE** `/centers/{id}`
- **Access**: ADMIN

### Get Center Students
- **GET** `/centers/{id}/students`
- **Access**: ADMIN, STAFF

### Get Center Teachers
- **GET** `/centers/{id}/teachers`
- **Access**: ADMIN, STAFF

### Get Center Courses
- **GET** `/centers/{id}/courses`
- **Access**: Public

---

## 6. Enquiry Module (`/enquiries`)

### Get All Enquiries
- **GET** `/enquiries`
- **Access**: ADMIN, STAFF

### Get Enquiry by ID
- **GET** `/enquiries/{id}`
- **Access**: ADMIN, STAFF

### Create Enquiry
- **POST** `/enquiries`
- **Access**: Public
- **Body**:
```json
{
  "firstName": "Mike",
  "lastName": "Wilson",
  "email": "mike@example.com",
  "phone": "+1234567890",
  "interestedCourseId": 1,
  "source": "WEBSITE",
  "message": "I'm interested in learning Java programming",
  "centerId": 1
}
```

### Update Enquiry
- **PUT** `/enquiries/{id}`
- **Access**: ADMIN, STAFF

### Delete Enquiry
- **DELETE** `/enquiries/{id}`
- **Access**: ADMIN

### Search Enquiries
- **GET** `/enquiries/search?keyword=mike`
- **Access**: ADMIN, STAFF

### Get Enquiries by Status
- **GET** `/enquiries/status/{status}`
- **Access**: ADMIN, STAFF

### Update Enquiry Status
- **PUT** `/enquiries/{id}/status?status=CONVERTED`
- **Access**: ADMIN, STAFF

---

## 7. Fees & Payment Module (`/fees`)

### 7.1 Fee Management

#### Get All Fees
- **GET** `/fees`
- **Access**: ADMIN, STAFF

#### Get Fee by ID
- **GET** `/fees/{id}`
- **Access**: ADMIN, STAFF, Owner

#### Create Fee
- **POST** `/fees`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "courseId": 1,
  "studentId": 1,
  "totalAmount": 299.99,
  "discount": 10.0,
  "dueDate": "2024-02-15",
  "centerId": 1
}
```

#### Update Fee
- **PUT** `/fees/{id}`
- **Access**: ADMIN, STAFF

#### Delete Fee
- **DELETE** `/fees/{id}`
- **Access**: ADMIN

#### Get Student Fees
- **GET** `/fees/student/{studentId}`
- **Access**: Public

#### Get Course Fees
- **GET** `/fees/course/{courseId}`
- **Access**: Public

### 7.2 Payment Management

#### Get All Payments
- **GET** `/fees/payments`
- **Access**: ADMIN, STAFF

#### Get Payment by ID
- **GET** `/fees/payments/{id}`
- **Access**: ADMIN, STAFF, Owner

#### Create Payment
- **POST** `/fees/payments`
- **Access**: Public
- **Body**:
```json
{
  "feeId": 1,
  "amount": 150.00,
  "method": "ONLINE",
  "transactionId": "TXN123456",
  "centerId": 1
}
```

#### Update Payment
- **PUT** `/fees/payments/{id}`
- **Access**: ADMIN, STAFF

#### Get Student Payments
- **GET** `/fees/payments/student/{studentId}`
- **Access**: Public

#### Process Payment
- **POST** `/fees/payments/{id}/process`
- **Access**: ADMIN, STAFF

#### Generate Receipt
- **GET** `/fees/receipt/{paymentId}`
- **Access**: Public

---

## 8. Exam Management Module (`/exams`)

### 8.1 Exam Management

#### Get All Exams
- **GET** `/exams`
- **Access**: Public

#### Get Exam by ID
- **GET** `/exams/{id}`
- **Access**: Public

#### Create Exam
- **POST** `/exams`
- **Access**: ADMIN, TEACHER
- **Body**:
```json
{
  "name": "Java Midterm Exam",
  "description": "Midterm examination for Java Programming course",
  "courseId": 1,
  "examDate": "2024-02-20T10:00:00",
  "duration": 120,
  "type": "MIDTERM",
  "totalMarks": 100,
  "isOnline": true,
  "centerId": 1
}
```

#### Update Exam
- **PUT** `/exams/{id}`
- **Access**: ADMIN, TEACHER

#### Delete Exam
- **DELETE** `/exams/{id}`
- **Access**: ADMIN

#### Get Course Exams
- **GET** `/exams/course/{courseId}`
- **Access**: Public

#### Get Student Exams
- **GET** `/exams/student/{studentId}`
- **Access**: Public

### 8.2 Question Management

#### Get Exam Questions
- **GET** `/exams/{examId}/questions`
- **Access**: Public

#### Add Question to Exam
- **POST** `/exams/{examId}/questions`
- **Access**: ADMIN, TEACHER
- **Body**:
```json
{
  "text": "What is the main method signature in Java?",
  "type": "MCQ",
  "marks": 5,
  "difficulty": "EASY",
  "topic": "Java Basics",
  "correctAnswer": "public static void main(String[] args)",
  "explanation": "The main method must be public, static, void, and take String array parameter"
}
```

#### Update Question
- **PUT** `/exams/questions/{questionId}`
- **Access**: ADMIN, TEACHER

#### Delete Question
- **DELETE** `/exams/questions/{questionId}`
- **Access**: ADMIN, TEACHER

### 8.3 Exam Results

#### Get Exam Results
- **GET** `/exams/{examId}/results`
- **Access**: ADMIN, TEACHER

#### Get Student Results
- **GET** `/exams/results/student/{studentId}`
- **Access**: Public

#### Evaluate Exam
- **POST** `/exams/{examId}/evaluate`
- **Access**: ADMIN, TEACHER

#### Submit Exam
- **POST** `/exams/{examId}/submit`
- **Access**: Public
- **Body**:
```json
{
  "answers": [
    {
      "questionId": 1,
      "studentAnswer": "public static void main(String[] args)"
    }
  ]
}
```

---

## 9. Certification Module (`/certifications`)

### Get All Certifications
- **GET** `/certifications`
- **Access**: ADMIN, STAFF

### Get Certification by ID
- **GET** `/certifications/{id}`
- **Access**: Public

### Create Certification
- **POST** `/certifications`
- **Access**: ADMIN, STAFF
- **Body**:
```json
{
  "studentId": 1,
  "courseId": 1,
  "issueDate": "2024-02-15",
  "expiryDate": "2027-02-15",
  "grade": "A",
  "centerId": 1
}
```

### Update Certification
- **PUT** `/certifications/{id}`
- **Access**: ADMIN, STAFF

### Delete Certification
- **DELETE** `/certifications/{id}`
- **Access**: ADMIN

### Get Student Certifications
- **GET** `/certifications/student/{studentId}`
- **Access**: Public

### Get Course Certifications
- **GET** `/certifications/course/{courseId}`
- **Access**: Public

### Generate Certificate
- **POST** `/certifications/{id}/generate`
- **Access**: ADMIN, STAFF

### Download Certificate
- **GET** `/certifications/{id}/download`
- **Access**: Public

### Verify Certificate (Public)
- **GET** `/certifications/verify/{certificateId}?studentName=John&courseName=Java`
- **Access**: Public (No Authentication Required)

### Get Certificate Status
- **GET** `/certifications/{id}/status`
- **Access**: Public

### Revoke Certificate
- **PUT** `/certifications/{id}/revoke`
- **Access**: ADMIN

---

## 10. Swagger/OpenAPI Documentation

### Swagger UI
- **URL**: `http://localhost:8080/api/swagger-ui.html`
- **Description**: Interactive API documentation

### OpenAPI JSON
- **URL**: `http://localhost:8080/api/api-docs`
- **Description**: OpenAPI specification in JSON format

---

## 11. H2 Database Console

### H2 Console
- **URL**: `http://localhost:8080/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:institute_db`
- **Username**: `sa`
- **Password**: `password`

---

## 12. API Response Format

All API responses follow this standardized format:

```json
{
  "status": "SUCCESS",
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

### Error Response Format
```json
{
  "status": "ERROR",
  "message": "Error description",
  "data": null,
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## 13. Role-Based Access Control

### Roles
- **ADMIN**: Full access to all endpoints
- **STAFF**: Access to most endpoints (except admin-only operations)
- **TEACHER**: Access to course, exam, and student-related endpoints
- **STUDENT**: Limited access to their own data and public endpoints

### Security Annotations
- `@PreAuthorize("hasRole('ADMIN')")` - Admin only
- `@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")` - Admin and Staff
- `@PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")` - Admin and Teachers
- No annotation - Public access

---

## 14. Testing the APIs

### 1. Start the Application
```bash
mvn spring-boot:run
```

### 2. Get JWT Token
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

### 3. Use JWT Token
```bash
curl -X GET http://localhost:8080/api/courses \
  -H "Authorization: Bearer <your_jwt_token>"
```

### 4. Default Test Data
The application automatically creates test data including:
- Admin user (admin/admin)
- Teacher user (teacher/teacher)
- Student user (student/student)
- Sample course categories and courses
- Sample centers

---

## 15. Postman Collection Import

You can import this API collection into Postman by:
1. Creating a new collection
2. Adding the base URL: `http://localhost:8080/api`
3. Adding the Authorization header with JWT token
4. Creating requests for each endpoint listed above

---

## 16. Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

This API collection covers all the major endpoints of the Institute Management System. Each endpoint includes proper authentication, authorization, and follows RESTful conventions. The system is designed to be secure, scalable, and easy to integrate with frontend applications.
