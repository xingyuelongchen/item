const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./bin/router');
const config = require('./bin/config');
const formidableMiddleware = require('express-formidable');
app.listen(config.server.port, config.server.domain, () => {
    console.log('server ', 'http://' + config.server.domain + ':' + config.server.port)
});
// 挂载 请求解析模块
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.json());

// app.use(formidableMiddleware());//formdata解析模块
app.use(router)
app.use('/favicon.ico', function () {
    return
})
app.use(express.static('assets'));
// 路由不存在
app.use('*', (req, res) => {
    res.status(403).send('403 - 请求错误，没有找到对应的处理程序')
})
