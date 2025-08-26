export const environment = {
  production: true,
  staging: false,
  apiUrl: 'https://api.institute-management.com/api',
  appName: 'Institute Management System',
  version: '1.0.0',
  enableDebug: false,
  logLevel: 'error',
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableErrorReporting: true,
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
  },
  auth: {
    tokenExpiry: 3600, // 1 hour
    refreshTokenExpiry: 604800, // 7 days
    enableRememberMe: false,
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
  },
  upload: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxFiles: 20,
    enableDragDrop: true,
    enableProgressBar: true,
    enablePreview: true,
    enableCompression: true,
    compressionQuality: 0.8,
    enableResize: true,
    maxWidth: 1920,
    maxHeight: 1080,
    enableWatermark: true,
    watermarkText: 'Institute Management System',
    watermarkPosition: 'bottom-right',
    watermarkOpacity: 0.3
  },
  pagination: {
    defaultPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100, 250],
    maxPageSize: 500,
    enablePageSizeSelector: true,
    enablePageInfo: true,
    enablePageNavigation: true,
    enableJumpToPage: true,
    enableItemsPerPage: true
  },
  cache: {
    enableCache: true,
    cacheExpiry: 1800, // 30 minutes
    maxCacheSize: 100, // MB
    enableServiceWorker: true,
    enableIndexedDB: true,
    enableLocalStorage: true,
    enableSessionStorage: true
  },
  analytics: {
    enableGoogleAnalytics: true,
    googleAnalyticsId: 'GA_MEASUREMENT_ID',
    enableMixpanel: false,
    mixpanelToken: '',
    enableHotjar: true,
    hotjarId: 'HOTJAR_ID',
    enableFacebookPixel: false,
    facebookPixelId: '',
    enableCustomAnalytics: true,
    customAnalyticsEndpoint: 'https://analytics.institute-management.com'
  },
  errorReporting: {
    enableSentry: true,
    sentryDsn: 'SENTRY_DSN',
    enableLogRocket: true,
    logRocketAppId: 'LOGROCKET_APP_ID',
    enableBugsnag: false,
    bugsnagApiKey: '',
    enableCustomErrorReporting: true,
    customErrorEndpoint: 'https://errors.institute-management.com'
  },
  notifications: {
    enablePushNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: true,
    enableInAppNotifications: true,
    notificationTimeout: 8000,
    maxNotifications: 10,
    enableSound: true,
    enableVibration: true
  },
  realTime: {
    enableWebSocket: true,
    webSocketUrl: 'wss://api.institute-management.com/ws',
    enableServerSentEvents: true,
    sseUrl: 'https://api.institute-management.com/events',
    enablePolling: false,
    pollingInterval: 30000, // 30 seconds
    enableReconnection: true,
    maxReconnectionAttempts: 10,
    reconnectionDelay: 2000
  },
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableXSSProtection: true,
    enableContentTypeSniffing: false,
    enableFrameOptions: true,
    frameOptions: 'DENY',
    enableReferrerPolicy: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    enableFeaturePolicy: true,
    enablePermissionsPolicy: true
  },
  performance: {
    enableLazyLoading: true,
    enablePreloading: true,
    enablePrefetching: true,
    enableCompression: true,
    enableMinification: true,
    enableTreeShaking: true,
    enableCodeSplitting: true,
    enableBundleAnalyzer: false,
    enableSourceMaps: false,
    enableOptimization: true
  },
  localization: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'],
    enableLanguageDetection: true,
    enableCurrencyFormatting: true,
    enableDateFormatting: true,
    enableNumberFormatting: true,
    enableTimeFormatting: true,
    enableRTL: false
  },
  theme: {
    defaultTheme: 'light',
    availableThemes: ['light', 'dark', 'auto'],
    enableThemeSwitcher: true,
    enableCustomColors: false,
    primaryColor: '#1976d2',
    accentColor: '#ff4081',
    warnColor: '#f44336',
    successColor: '#4caf50',
    infoColor: '#2196f3'
  },
  api: {
    timeout: 60000, // 60 seconds
    retryAttempts: 5,
    retryDelay: 2000,
    enableRequestLogging: false,
    enableResponseLogging: false,
    enableErrorLogging: true,
    enablePerformanceLogging: true,
    enableCaching: true,
    cacheExpiry: 1800, // 30 minutes
    enableCompression: true,
    enableGzip: true,
    enableBrotli: true
  }
};
