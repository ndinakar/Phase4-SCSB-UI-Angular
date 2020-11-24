// "devServer": {
//     "historyApiFallback": true,
//     "proxy": {
//         "/api": {
//             "target": "http://localhost:3000",
//             "secure": false
//         }
//     }
// }
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9089',
                pathRewrite: { '^/api': '' },
                secure: 'false'
            }
        }
    }
};