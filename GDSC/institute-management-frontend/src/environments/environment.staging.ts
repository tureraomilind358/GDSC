export const environment = {
  production: false,
  staging: true,
  apiUrl: 'https://staging-api.institute-management.com/api',
  appName: 'Institute Management System (Staging)',
  version: '1.0.0',
  enableDebug: true,
  logLevel: 'warn',
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableErrorReporting: true,
    enablePWA: false,
    enableOfflineMode: false,
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
    enableBrotli: false
  },
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
    passwordMinLength: 10,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    enableTwoFactorAuth: false,
    enableEmailVerification: true,
    enablePhoneVerification: false
  },
  upload: {
    maxFileSize: 25 * 1024 * 1024, // 25MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxFiles: 15,
    enableDragDrop: true,
    enableProgressBar: true,
    enablePreview: true,
    enableCompression: true,
    compressionQuality: 0.8,
    enableResize: true,
    maxWidth: 1920,
    maxHeight: 1080,
    enableWatermark: true,
    watermarkText: 'Institute Management System (Staging)',
    watermarkPosition: 'bottom-right',
    watermarkOpacity: 0.4
  },
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100, 200],
    maxPageSize: 300,
    enablePageSizeSelector: true,
    enablePageInfo: true,
    enablePageNavigation: true,
    enableJumpToPage: true,
    enableItemsPerPage: true
  },
  cache: {
    enableCache: true,
    cacheExpiry: 900, // 15 minutes
    maxCacheSize: 75, // MB
    enableServiceWorker: false,
    enableIndexedDB: true,
    enableLocalStorage: true,
    enableSessionStorage: true
  },
  analytics: {
    enableGoogleAnalytics: true,
    googleAnalyticsId: 'GA_STAGING_ID',
    enableMixpanel: false,
    mixpanelToken: '',
    enableHotjar: true,
    hotjarId: 'HOTJAR_STAGING_ID',
    enableFacebookPixel: false,
    facebookPixelId: '',
    enableCustomAnalytics: true,
    customAnalyticsEndpoint: 'https://staging-analytics.institute-management.com'
  },
  errorReporting: {
    enableSentry: true,
    sentryDsn: 'SENTRY_STAGING_DSN',
    enableLogRocket: true,
    logRocketAppId: 'LOGROCKET_STAGING_APP_ID',
    enableBugsnag: false,
    bugsnagApiKey: '',
    enableCustomErrorReporting: true,
    customErrorEndpoint: 'https://staging-errors.institute-management.com'
  },
  notifications: {
    enablePushNotifications: false,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enableInAppNotifications: true,
    notificationTimeout: 6000,
    maxNotifications: 8,
    enableSound: false,
    enableVibration: false
  },
  realTime: {
    enableWebSocket: true,
    webSocketUrl: 'wss://staging-api.institute-management.com/ws',
    enableServerSentEvents: true,
    sseUrl: 'https://staging-api.institute-management.com/events',
    enablePolling: false,
    pollingInterval: 30000, // 30 seconds
    enableReconnection: true,
    maxReconnectionAttempts: 8,
    reconnectionDelay: 1500
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
    enablePrefetching: false,
    enableCompression: true,
    enableMinification: true,
    enableTreeShaking: true,
    enableCodeSplitting: true,
    enableBundleAnalyzer: true,
    enableSourceMaps: true,
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
    timeout: 45000, // 45 seconds
    retryAttempts: 4,
    retryDelay: 1500,
    enableRequestLogging: true,
    enableResponseLogging: false,
    enableErrorLogging: true,
    enablePerformanceLogging: true,
    enableCaching: true,
    cacheExpiry: 900, // 15 minutes
    enableCompression: true,
    enableGzip: true,
    enableBrotli: false
  }
};
