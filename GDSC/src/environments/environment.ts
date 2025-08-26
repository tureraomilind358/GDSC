export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Institute Management System',
  appVersion: '1.0.0',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  
  // Feature flags
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableDebugMode: true,
    enableFileUpload: true,
    enableRealTimeUpdates: false
  },
  
  // API Configuration
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  },
  
  // Authentication
  auth: {
    tokenExpiryWarning: 5 * 60 * 1000, // 5 minutes
    refreshTokenThreshold: 10 * 60 * 1000, // 10 minutes
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000 // 15 minutes
  },
  
  // File Upload
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    maxFiles: 5
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  
  // Date Format
  dateFormat: {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    time: 'HH:mm:ss'
  },
  
  // Currency
  currency: {
    code: 'USD',
    symbol: '$',
    position: 'before'
  },
  
  // Logging
  logging: {
    level: 'debug',
    enableConsoleLog: true,
    enableRemoteLog: false,
    remoteLogUrl: ''
  }
};
