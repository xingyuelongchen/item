const path = require("path");
const config = {
    root: path.resolve(__dirname, '../../'),
    rootSrc: path.resolve(__dirname, '../../src'),
    server: {
        domain: '0.0.0.0',
        port: 3000,
    },
    db: {
        domain: '127.0.0.1',
        port: '27017',
        username: '',
        password: '',
        dbName: 'test',
        table: {
            user: 'user',
            token: 'token',
            uid_id: 'uid_id'
        }
    },
    error: {
        404: `404 - 资源未找到. Server Error`,
        450: `450 - 请重新登陆.`,
        500: `500 - 处理程序未定义. Server Error`,
        501: `501 - Token 验证失败. Server Error`,
        502: '502 - 日志记录写入失败. Server Error',
        505: `505 - 数据库出错. Server Error`,
    }
}


module.exports = config;