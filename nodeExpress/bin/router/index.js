const config = require('../config');
const db = require('../database');
const api = require('../functions');
const router = require('express').Router();
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const URL = require('url');



// 跨域响应头设置
router.use(request);
// 配置系统 API 到 res 对象
router.use((req, res, next) => {
    res['ApiMD5'] = md5;
    let obj = resReturn(req, res, config);
    Object.assign(res, api, obj);
    next();
});
// 验证请求Token 和 uid_id
router.use(token);
// 挂载路由模块
router.all('/*', route);
module.exports = router;

// 验证请求 token 和 uid_id
function token(req, res, next) {
    // 验证公共请求token
    // if (req.headers.token !== 'token') {
    //     res.error(501);
    //     return;
    // }

    // 删除过期uid_id
    res.ApiDb.find({
        table: config.db.table.uid_id,
        find: {}
    }, (err, data) => {
        data.forEach(e => {
            if (!err && e.maxAge < Date.now()) {
                res.ApiDb.del({
                    table: config.db.table.uid_id,
                    find: {
                        uid_id: e.uid_id
                    }
                })
            }
        })
    })
    // 验证私密请求token
    if (/(\/user\/|\/manage\/)/.test(req.url)) {
        res.ApiDb.find({
            table: config.db.table.uid_id,
            find: {
                uid_id: req.cookies.uid_id
            }
        }, (err, data) => {
            // 查询uid_id是否有效
            if (!err && data.length > 0 && data[0].maxAge > Date.now() && data[0].uid_id == req.cookies.uid_id) {
                // 验证当前用户是否有管理接口访问权限
                if ((/(\/manage\/)/.test(req.url) && !((data[0].user.role.genre == 'admin') || data[0].user.role.genre == 'manage'))) {
                    res.error(405)
                    return;
                }
                // 如果uid_id快过期了，则自动更新
                if (data[0].maxAge < (Date.now() + 4 * 24 * 60 * 60 * 1000)) {
                    res.ApiDb.update({
                        table: config.db.table.uid_id,
                        find: {
                            uid_id: req.cookies.uid_id
                        },
                        value: {
                            maxAge: Date.now() + 24 * 7 * 60 * 60 * 1000
                        }
                    })
                }
                res.userInfo = data[0].user;
                next()
            } else {
                res.error(450)
            }

        })
    } else {
        next()
    }

}
// res返回数据接口
function resReturn(req, res) {
    return {
        setlog(data) {
            return this.ApiLog.setlog.bind(this)(req, data)
        },
        error(code) {
            let text = config.error[code]
            this.status(code).send({
                code,
                message: text
            })
        },
        info(data) {
            if (data.log) {
                this.setlog(data.log).then(e => {
                    delete data.log;
                    this.status(400).send({
                        code: 400,
                        message: data
                    })
                }).catch(e => {
                    console.log(err);
                    console.log('Error: ', __dirname);
                    delete data.log;
                    this.status(400).send({
                        code: 400,
                        message: data,
                        log: '日志记录写入失败'
                    })
                });
            } else {
                this.status(400).send({
                    code: 400,
                    message: typeof data == 'object' ? data : {
                        message: data
                    }
                })
            }
        },
        succress(data) {
            if (data.log) {
                this.setlog(data.log).then(e => {
                    delete data.log;
                    this.status(200).send({
                        code: 200,
                        message: 'ok',
                        content: data
                    })
                }).catch(err => {
                    console.log(err);
                    console.error('Error: ', __dirname);
                    delete data.log;
                    this.status(200).send({
                        code: 200,
                        message: '请求处理完成，日志记录写入失败',
                        content: data
                    })
                })
            } else {
                typeof data == 'object' ? data = {
                    ...data
                } : '';
                this.status(200).send({
                    code: 200,
                    message: 'ok',
                    content: data
                })
            }
        }
    }
}
// 设置响应头和预检请求返回
function request(req, res, next) {
    res.header({
        "Access-Control-Allow-Origin": req.headers.origin, // 允许跨域请求的地址
        // "Access-Control-Allow-Origin": 'http://192.168.1.101:8080', // 允许跨域请求的地址
        "Access-Control-Allow-Methods": "DELETE,GET,POST,PUT,OPTIONS",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Accept, Content-Type, token, uid_id",
        "Access-Control-Max-Age": '10000',
    });
    // 预检请求返回
    if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200);
    } else {
        next();
    }
}
// 挂载路由模块
function route(req, res, next) {
    let urlPath = URL.parse(req.url);
    let Path = path.resolve(config.rootSrc + urlPath.pathname, './index.js');

    if (fs.existsSync(Path) && fs.existsSync(Path)) {
        require(Path)(req, res, config)
    } else {
        next()
    }
}