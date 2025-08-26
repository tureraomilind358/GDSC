export const environment = {
  production: false,
  staging: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Institute Management System',
  version: '1.0.0',
  enableDebug: true,
  logLevel: 'debug',
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableErrorReporting: true,
    enablePWA: false,
    enableOfflineMode: false,
    enableRealTimeUpdates: false,
    enableFileUpload: true,
    enableExport: true,
    enableImport: true,
    enableBulkOperations: true,
    enableAdvancedSearch: true,
    enableFilters: true,
    enableSorting: true,
    enablePagination: true,
    enableInfiniteScroll: false,
    enableVirtualScroll: false,
    enableLazyLoading: true,
    enableCaching: true,
    enableCompression: false,
    enableGzip: false,
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
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    enableTwoFactorAuth: false,
    enableEmailVerification: true,
    enablePhoneVerification: false
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxFiles: 10,
    enableDragDrop: true,
    enableProgressBar: true,
    enablePreview: true,
    enableCompression: false,
    compressionQuality: 0.8,
    enableResize: false,
    maxWidth: 1920,
    maxHeight: 1080,
    enableWatermark: false,
    watermarkText: 'Institute Management System',
    watermarkPosition: 'bottom-right',
    watermarkOpacity: 0.5
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
    maxPageSize: 100,
    enablePageSizeSelector: true,
    enablePageInfo: true,
    enablePageNavigation: true,
    enableJumpToPage: true,
    enableItemsPerPage: true
  },
  cache: {
    enableCache: true,
    cacheExpiry: 300, // 5 minutes
    maxCacheSize: 50, // MB
    enableServiceWorker: false,
    enableIndexedDB: true,
    enableLocalStorage: true,
    enableSessionStorage: true
  },
  analytics: {
    enableGoogleAnalytics: false,
    googleAnalyticsId: '',
    enableMixpanel: false,
    mixpanelToken: '',
    enableHotjar: false,
    hotjarId: '',
    enableFacebookPixel: false,
    facebookPixelId: '',
    enableCustomAnalytics: false,
    customAnalyticsEndpoint: ''
  },
  errorReporting: {
    enableSentry: false,
    sentryDsn: '',
    enableLogRocket: false,
    logRocketAppId: '',
    enableBugsnag: false,
    bugsnagApiKey: '',
    enableCustomErrorReporting: false,
    customErrorEndpoint: ''
  },
  notifications: {
    enablePushNotifications: false,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enableInAppNotifications: true,
    notificationTimeout: 5000,
    maxNotifications: 5,
    enableSound: false,
    enableVibration: false
  },
  realTime: {
    enableWebSocket: false,
    webSocketUrl: 'ws://localhost:3000/ws',
    enableServerSentEvents: false,
    sseUrl: 'http://localhost:3000/events',
    enablePolling: false,
    pollingInterval: 30000, // 30 seconds
    enableReconnection: true,
    maxReconnectionAttempts: 5,
    reconnectionDelay: 1000
  },
  security: {
    enableCSP: false,
    enableHSTS: false,
    enableXSSProtection: true,
    enableContentTypeSniffing: false,
    enableFrameOptions: true,
    frameOptions: 'DENY',
    enableReferrerPolicy: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    enableFeaturePolicy: false,
    enablePermissionsPolicy: false
  },
  performance: {
    enableLazyLoading: true,
    enablePreloading: false,
    enablePrefetching: false,
    enableCompression: false,
    enableMinification: true,
    enableTreeShaking: true,
    enableCodeSplitting: true,
    enableBundleAnalyzer: false,
    enableSourceMaps: true,
    enableOptimization: false
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
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000,
    enableRequestLogging: true,
    enableResponseLogging: true,
    enableErrorLogging: true,
    enablePerformanceLogging: false,
    enableCaching: true,
    cacheExpiry: 300, // 5 minutes
    enableCompression: false,
    enableGzip: false,
    enableBrotli: false
  }
};
