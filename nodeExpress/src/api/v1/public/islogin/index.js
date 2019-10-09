// 验证是否登录
// true 表示有效登录
// false 表示无效登录
module.exports = (req, res, config) => {
    if (!req.cookies.uid_id) {
        res.send(false)
    }
    if (req.cookies.uid_id) {
        res.ApiDb.find({
            table: config.db.table.uid_id,
            find: {
                uid_id: req.cookies.uid_id
            }
        }, (err, db) => {
            if (db[0].uid_id == req.cookies.uid_id) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
    }
}