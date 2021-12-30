

//引入依赖
const { createProxyMiddleware } = require('http-proxy-middleware');

//添加代理
module.exports = function (app) {
    app.use('/netclound', createProxyMiddleware({ target: 'http://1.12.246.138:5000', changeOrigin: true, pathRewrite: { '^/netclound': '/' } }));
    app.use('/migumusic', createProxyMiddleware({ target: 'http://1.12.246.138:6000', changeOrigin: true, pathRewrite: { '^/migumusic': '/' } }))
    app.use('/qqmusic', createProxyMiddleware({ target: 'http://1.12.246.138:7000', changeOrigin: true, pathRewrite: { '^/qqmusic': '/' } }));
};