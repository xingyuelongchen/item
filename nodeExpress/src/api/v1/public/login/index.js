const url = require('url')
module.exports = function (req, res, config) {

    try {
        ({
            'post': post,
            'get': get
        }[req.method.toLowerCase()])(req, res, config)
    } catch (error) {
        console.log(error)
        res.info('请求错误')
    }
}
// 退出登录
function get(req, res, config) {

    let uid_id = req.cookies.uid_id;
    res.clearCookie("uid_id");
    res.ApiDb.del({
        table: config.db.table.uid_id,
        find: {
            uid_id
        }
    }, (err, d) => {
        if (!err) {
            res.succress({
                message: '退出登录'
            })
        } else {
            res.error(500)
        }
    })

}

const userInfo = {
    name: {
        required: true,
        type: /^[\w\d\u4e00-\u9fa5]{3,32}$/,
        message: '账号只能是字母、数字、中文、手机号、邮箱'
    },
    password: {
        required: true,
        type: /^[\w\d]{6,32}$/,
        message: '密码不符合规则'
    },
}
// 请求登陆
function post(req, res, config) {
    let {
        name,
        password
    } = req.body;
    let info = res.ApiExp({
        name,
        password
    }, userInfo);
    if (info.error) {
        res.info(info.message)
        return;
    }

    let find = {
        table: 'user',
        find: {
            $or: [{
                name
            }, {
                phone: name
            }, {
                email: name
            }]
        }
    }
    res.ApiDb.find(find, (err, d) => {
        if (d.length > 0 && d[0].password == res.ApiMD5(password)) {
            // 生成token
            let uid_id = res.ApiMD5(res.ApiMD5(d[0].password) + res.ApiMD5(d[0]._id));
            // 不返回敏感信息
            delete d[0].password;
            let user = d[0];
            user.uid_id = uid_id;
            res.userInfo = user;

            let data = {
                domain: req.headers.host,
                uid_id: uid_id,
                maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
                user,
            }
            // 向客户端添加token
            res.cookie('uid_id', uid_id, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            // console.log(uid_id)
            // 查询当前账户是否已有token信息
            res.ApiDb.find({
                table: config.db.table.uid_id,
                find: {
                    uid_id
                },
            }, (err, e) => {
                if (err) {
                    res.info('登陆失败')
                    return
                }
                // 未登录，添加当前token
                if (e.length == 0) {
                    res.ApiDb.insert(config.db.table.uid_id, data, (err, data) => { })
                }
                // 已登录，更新token
                if (e.length > 0) {
                    let option = {
                        table: config.db.table.uid_id,
                        find: { uid_id },
                        value: data
                    }
                    res.ApiDb.update(option, (err, data) => { })
                }
                res.succress({
                    message: '登陆成功',
                    data: user,
                    log: {
                        type: 'login',
                        message: '账户登陆'
                    }
                })
            })
        } else {
            res.info('登陆失败,请检查账户或密码')
        }

    })
}