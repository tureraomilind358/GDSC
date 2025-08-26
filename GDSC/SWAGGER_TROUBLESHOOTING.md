# Swagger/OpenAPI Troubleshooting Guide

## Issue: Swagger UI Not Working

### 1. Check Application Startup
First, ensure your application starts without errors:
```bash
mvn spring-boot:run
```

Look for any error messages in the console.

### 2. Verify Swagger URLs
After starting the application, try these URLs:

**Primary Swagger UI:**
- `http://localhost:8080/api/swagger-ui.html`

**Alternative URLs:**
- `http://localhost:8080/api/swagger-ui/index.html`
- `http://localhost:8080/api/swagger-ui/`

**OpenAPI JSON:**
- `http://localhost:8080/api/api-docs`

**Health Check:**
- `http://localhost:8080/api/health`

### 3. Common Issues and Solutions

#### Issue 1: 404 Not Found
**Cause:** Security configuration blocking access
**Solution:** Check SecurityConfig.java - ensure Swagger paths are permitted

#### Issue 2: White Label Error Page
**Cause:** Spring Boot can't find the Swagger UI
**Solution:** Verify springdoc dependency in pom.xml

#### Issue 3: CORS Issues
**Cause:** Browser blocking cross-origin requests
**Solution:** Add CORS configuration if needed

### 4. Debug Steps

#### Step 1: Check Dependencies
Verify these dependencies are in your pom.xml:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>
```

#### Step 2: Check Configuration
Verify application.yml has:
```yaml
springdoc:
  api-docs:
    path: /api-docs
    enabled: true
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
```

#### Step 3: Check Security
Verify SecurityConfig.java permits:
```java
.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**", "/v3/api-docs/**").permitAll()
```

### 5. Alternative Solutions

#### Solution 1: Use Different Swagger Path
If `/swagger-ui.html` doesn't work, try:
```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui/index.html
```

#### Solution 2: Disable Security for Swagger (Development Only)
Temporarily disable security for Swagger paths:
```java
.requestMatchers("/**").permitAll() // WARNING: Only for development
```

#### Solution 3: Use Different Port
If port 8080 is busy, change in application.yml:
```yaml
server:
  port: 8081
```

### 6. Testing Commands

#### Test Health Endpoint
```bash
curl http://localhost:8080/api/health
```

#### Test OpenAPI JSON
```bash
curl http://localhost:8080/api/api-docs
```

#### Test Swagger UI
Open in browser: `http://localhost:8080/api/swagger-ui.html`

### 7. Logs to Check

Look for these log messages:
```
INFO  o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api-docs],methods=[GET]}" onto public ResponseEntity<org.springdoc.core.models.GroupedOpenApi>
INFO  o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/swagger-ui/**],methods=[GET]}" onto public org.springframework.web.servlet.ModelAndView
```

### 8. Final Checklist

- [ ] Application starts without errors
- [ ] Health endpoint works: `/api/health`
- [ ] OpenAPI JSON accessible: `/api/api-docs`
- [ ] Swagger UI accessible: `/api/swagger-ui.html`
- [ ] No security blocking Swagger paths
- [ ] Correct springdoc dependency version
- [ ] Proper configuration in application.yml

### 9. If Still Not Working

1. **Check Spring Boot version compatibility**
2. **Try different springdoc version**
3. **Check for conflicting dependencies**
4. **Verify Java version (17+)**
5. **Clear Maven cache: `mvn clean install`**

### 10. Emergency Fallback

If Swagger still doesn't work, you can:
1. Use the API_COLLECTION.md for manual testing
2. Use Postman with the provided collection
3. Test endpoints directly with curl commands
4. Check H2 console for database verification

---

**Need Help?** Check the console logs for specific error messages and refer to this guide.
