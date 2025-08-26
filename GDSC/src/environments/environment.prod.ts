export const environment = {
  production: true,
  apiUrl: 'https://api.institutemanagement.com/api',
  appName: 'Institute Management System',
  appVersion: '1.0.0',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  
  // Feature flags
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableDebugMode: false,
    enableFileUpload: true,
    enableRealTimeUpdates: true
  },
  
  // API Configuration
  api: {
    timeout: 60000,
    retryAttempts: 2,
    retryDelay: 2000
  },
  
  // Authentication
  auth: {
    tokenExpiryWarning: 5 * 60 * 1000, // 5 minutes
    refreshTokenThreshold: 10 * 60 * 1000, // 10 minutes
    maxLoginAttempts: 3,
    lockoutDuration: 30 * 60 * 1000 // 30 minutes
  },
  
  // File Upload
  fileUpload: {
    maxSize: 25 * 1024 * 1024, // 25MB
    allowedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    maxFiles: 10
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100]
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
    level: 'error',
    enableConsoleLog: false,
    enableRemoteLog: true,
    remoteLogUrl: 'https://logs.institutemanagement.com'
  }
};
