
var appURL = window.location.protocol + '//' + window.location.hostname;

export const urls = {
    search: '/search',
    collection: '/collection',
    requests: '/request',
    reports: '/reports',
    jobs: '/jobs',
    userRoles: '/userRoles',
    roles: '/roles',
    bulkRequest: '/bulkRequest',
    admin: '/admin',
    login: '/login',
    dataExport: '/dataExport',
    openMarc: '/openMarcRecord',
    dashBoard: '/validation',
    casPrefix: '/login-scsb?institution=',
    api: '/api',
    batchScheduleUrl: appURL + ':9096',
    LOGOUT: '/logout?CSRF-TOKEN=',
    appUrl: appURL,
    PORT: window.location.port
}