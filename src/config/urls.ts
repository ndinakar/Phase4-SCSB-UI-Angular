
var appURL = window.location.protocol + '//' + window.location.hostname;

export const urls = {
    search: 'http://localhost:9091' + '/search',
    collection: 'http://localhost:9091' + '/collection',
    requests: 'http://localhost:9091' + '/request',
    reports: 'http://localhost:9091' + '/reports',
    jobs: 'http://localhost:9091' + '/jobs',
    userRoles: 'http://localhost:9091' + '/userRoles',
    roles: 'http://localhost:9091' + '/roles',
    bulkRequest: 'http://localhost:9091' + '/bulkRequest',
    admin: 'http://localhost:9091' + '/admin',
    login: 'http://localhost:9091' + '/login',
    dataExport: 'http://localhost:9091' + '/dataExport',
    openMarc: 'http://localhost:9091' + '/openMarcRecordByBibId',
    dashBoard: 'http://localhost:9091' + '/validation',
    casPrefix: '/login-scsb?institution=',
    api: 'http://localhost:9091' + '/api',
    batchScheduleUrl: appURL + ':9096',
    LOGOUT: '/logout?CSRF-TOKEN=',
    appUrl: appURL,
    PORT: window.location.port,
    MONITORING: 'http://localhost:9091' + '/monitoring'
}