# Institute Management System - Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Configuration](#build-configuration)
4. [Production Deployment](#production-deployment)
5. [Staging Deployment](#staging-deployment)
6. [Development Setup](#development-setup)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Monitoring & Analytics](#monitoring--analytics)
9. [Security Configuration](#security-configuration)
10. [Performance Optimization](#performance-optimization)
11. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 19.0.0
- Git >= 2.30.0

### Backend Requirements
- RESTful API server running on the configured endpoints
- Database (PostgreSQL/MySQL/MongoDB)
- File storage service (AWS S3, Google Cloud Storage, etc.)
- Email service (SendGrid, AWS SES, etc.)
- SMS service (Twilio, AWS SNS, etc.)

### Infrastructure Requirements
- Web server (Nginx, Apache)
- CDN for static assets
- SSL certificate
- Load balancer (optional)
- Monitoring tools

## Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd institute-management-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

#### Development Environment
```bash
# Uses environment.ts by default
npm start
```

#### Staging Environment
```bash
# Uses environment.staging.ts
npm run build:staging
npm run serve:staging
```

#### Production Environment
```bash
# Uses environment.prod.ts
npm run build:prod
npm run serve:prod
```

### 4. Environment Variables

Create `.env` files for each environment:

#### .env.development
```env
API_URL=http://localhost:3000/api
ENABLE_DEBUG=true
LOG_LEVEL=debug
```

#### .env.staging
```env
API_URL=https://staging-api.institute-management.com/api
ENABLE_DEBUG=true
LOG_LEVEL=warn
GA_ID=GA_STAGING_ID
SENTRY_DSN=SENTRY_STAGING_DSN
```

#### .env.production
```env
API_URL=https://api.institute-management.com/api
ENABLE_DEBUG=false
LOG_LEVEL=error
GA_ID=GA_MEASUREMENT_ID
SENTRY_DSN=SENTRY_DSN
HOTJAR_ID=HOTJAR_ID
```

## Build Configuration

### Production Build
```bash
# Optimized production build
npm run build:prod

# Build with bundle analysis
npm run analyze

# Build with specific configuration
ng build --configuration production --aot --build-optimizer --optimization
```

### Build Options
- `--aot`: Ahead-of-Time compilation
- `--build-optimizer`: Enable build optimizer
- `--optimization`: Enable optimization
- `--source-map`: Generate source maps (disabled in production)
- `--stats-json`: Generate bundle statistics

### Bundle Optimization
The production build includes:
- Tree shaking
- Code splitting
- Minification
- Compression (gzip/brotli)
- Dead code elimination
- Module concatenation

## Production Deployment

### 1. Build Application
```bash
npm run build:prod
```

### 2. Web Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name institute-management.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name institute-management.com;

    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.institute-management.com wss://api.institute-management.com;";

    # Root directory
    root /var/www/institute-management-frontend/dist/institute-management-frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Angular routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass https://api.institute-management.com;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

#### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName institute-management.com
    Redirect permanent / https://institute-management.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName institute-management.com
    DocumentRoot /var/www/institute-management-frontend/dist/institute-management-frontend

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key

    # Security Headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.institute-management.com wss://api.institute-management.com;"

    # Gzip compression
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|rar|zip|exe|flv|mov|wma|mp3|avi|swf|mp?g|mp4|webm|webp)$ no-gzip dont-vary

    # Angular routing
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [QSA,L]

    # Cache static assets
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </FilesMatch>
</VirtualHost>
```

### 3. Docker Deployment

#### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist/institute-management-frontend /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY ssl/ /etc/nginx/ssl/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  # Optional: Add monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

### 4. Cloud Deployment

#### AWS S3 + CloudFront
```bash
# Build application
npm run build:prod

# Sync to S3
aws s3 sync dist/institute-management-frontend s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### Google Cloud Platform
```bash
# Build application
npm run build:prod

# Deploy to App Engine
gcloud app deploy app.yaml

# Or deploy to Cloud Run
gcloud run deploy institute-management-frontend --source .
```

#### Azure
```bash
# Build application
npm run build:prod

# Deploy to Azure Static Web Apps
az staticwebapp create --name institute-management-frontend --source .
```

## Staging Deployment

### 1. Build Staging Version
```bash
npm run build:staging
```

### 2. Deploy to Staging Environment
```bash
# Similar to production but with staging configuration
# Use staging URLs and configurations
```

## Development Setup

### 1. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### 2. Development Tools
- Angular DevTools (browser extension)
- Redux DevTools (if using state management)
- Network tab for API debugging
- Console for error tracking

## CI/CD Pipeline

### GitHub Actions
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build:prod

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:staging
      - name: Deploy to staging
        run: |
          # Deploy to staging environment

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:prod
      - name: Deploy to production
        run: |
          # Deploy to production environment
```

### GitLab CI
```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm test

build-staging:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build:staging
  artifacts:
    paths:
      - dist/
  only:
    - develop

build-production:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build:prod
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy-staging:
  stage: deploy
  script:
    - echo "Deploy to staging"
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploy to production"
  only:
    - main
```

## Monitoring & Analytics

### 1. Application Monitoring
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Google Analytics**: User behavior and traffic analysis
- **Hotjar**: Heatmaps and user recordings

### 2. Performance Monitoring
- **Lighthouse**: Performance audits
- **WebPageTest**: Performance testing
- **GTmetrix**: Performance analysis
- **PageSpeed Insights**: Google's performance tool

### 3. Server Monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **New Relic**: Application performance monitoring
- **Datadog**: Infrastructure monitoring

### 4. Uptime Monitoring
- **Pingdom**: Uptime monitoring
- **UptimeRobot**: Free uptime monitoring
- **StatusCake**: Website monitoring
- **Monit**: Local monitoring

## Security Configuration

### 1. Content Security Policy (CSP)
```javascript
// Add to index.html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.institute-management.com wss://api.institute-management.com;
  frame-ancestors 'none';
">
```

### 2. Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- Referrer-Policy: strict-origin-when-cross-origin

### 3. SSL/TLS Configuration
- Use TLS 1.2 or higher
- Enable HTTP/2
- Configure secure cipher suites
- Enable HSTS

### 4. Authentication Security
- Implement JWT with short expiry
- Use refresh tokens
- Enable CSRF protection
- Implement rate limiting
- Enable two-factor authentication

## Performance Optimization

### 1. Bundle Optimization
- Enable tree shaking
- Use code splitting
- Implement lazy loading
- Optimize images
- Enable compression

### 2. Caching Strategy
- Browser caching for static assets
- Service worker for offline support
- CDN for global distribution
- API response caching

### 3. Image Optimization
- Use WebP format
- Implement lazy loading
- Use responsive images
- Optimize image sizes

### 4. Code Optimization
- Minify JavaScript and CSS
- Remove unused code
- Optimize imports
- Use production builds

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check Angular CLI version
ng version

# Update Angular CLI
npm install -g @angular/cli@latest
```

#### Runtime Errors
- Check browser console for errors
- Verify API endpoints are accessible
- Check network connectivity
- Validate environment configuration

#### Performance Issues
- Run bundle analysis: `npm run analyze`
- Check for memory leaks
- Optimize images and assets
- Enable production mode

#### Deployment Issues
- Verify SSL certificates
- Check server configuration
- Validate environment variables
- Test API connectivity

### Debug Commands
```bash
# Check application health
curl -I https://institute-management.com/health

# Test API connectivity
curl -X GET https://api.institute-management.com/api/health

# Check SSL certificate
openssl s_client -connect institute-management.com:443 -servername institute-management.com

# Monitor application logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Support
For additional support:
- Check the application logs
- Review the error reporting dashboard
- Contact the development team
- Refer to the API documentation

---

**Note**: This deployment guide should be customized based on your specific infrastructure, security requirements, and operational procedures.
