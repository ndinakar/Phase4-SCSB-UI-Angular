
var appURL = window.location.protocol + '//' + window.location.hostname;

export const urls = {
    SEARCH: 'http://localhost:9091' +  '/search',
    COLLECTION: 'http://localhost:9091' +  '/collection',
    REQUESTS: 'http://localhost:9091' +  '/request',
    REPORTS: 'http://localhost:9091' +  '/reports',
    JOBS: 'http://localhost:9091' +  '/jobs',
    USER_ROLES: 'http://localhost:9091' +  '/userRoles',
    ROLES: 'http://localhost:9091' +  '/roles',
    BULK_REQUEST: 'http://localhost:9091' +  '/bulkRequest',
    ADMIN: 'http://localhost:9091' +  '/admin',
    LOGIN: 'http://localhost:9091' +  '/login',
    MONITORING: 'http://localhost:9091' +  '/monitoring',
    DATA_EXPORT: 'http://localhost:9091' +  '/dataExport',
    OPEN_MARC: 'http://localhost:9091' +  '/openMarcRecordByBibId',
    DASHBOARD: 'http://localhost:9091' +  '/validation',
    API: 'http://localhost:9091' +  '/api',
    BATCH_SCHEDULE: appURL + ':9096',
    CAS_PREFIX: '/login-scsb?institution=',
    LOGOUT: '/logout?CSRF-TOKEN=',
    APP_URL: appURL,
    PORT: window.location.port
}