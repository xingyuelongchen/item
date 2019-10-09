


module.exports = function (req, res, config) {
    try {
        ({ 'get': get, 'post': post, 'delete': del, 'put': put }[req.method.toLowerCase()])(req, res, config)
    } catch (error) {
        console.log(error)
        res.status(400).send(req.url + ' 请求错误')
    }
}
// 查询所有用户信息
function get(req, res, config) {
    let find = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { userName: { $regex: req.query.search, $options: 'i' } },
            { phone: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
            { age: { $regex: req.query.search, $options: 'i' } },
            { address: { $regex: req.query.search, $options: 'i' } },
            { city: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};
    res.ApiDb.query({
        table: config.db.table.user,
        skip: req.query.page || 0,
        find,
    }, (err, db) => {
        if (err) {
            res.error(500);
        } else {
            res.succress(db)
        }
    })
}
// 添加用户
function post(req, res, config) {
    console.log(req.body)
    // let isError = res.ApiExp()
    // if()
    res.send('manage - post')
}
// 删除用户
function del(req, res, config) {
    // console.log(res.userInfo._id, req.query)
    console.log('sdfsfs')
    if (res.userInfo.id == req.query.id) {
        res.info('删除失败,不能删除自己');

    } else {
        if (!req.query.id) {
            res.info('id不能为空');
            return;
        }
        res.ApiDb.find({
            table: config.db.table.user,
            find: { id: req.query.id }
        }, (err, userInfo) => {
            if (err) { res.info('未找到账号'); return }
            res.ApiDb.del({
                table: config.db.table.user,
                find: { id: req.query.id }
            }, (err, db) => {
                if (db.n == 0) {
                    res.info('未找到账号')
                }
                if (db.n > 0) {
                    res.succress({
                        message:'删除完成',
                        delNumber: db.n, log: {
                            message: '删除用户',
                            delUserInfo: userInfo[0]
                        }
                    })
                }
            })
        })
    }
}
// 更新用户信息
function put(req, res, config) {
    res.send('manage - put')
}