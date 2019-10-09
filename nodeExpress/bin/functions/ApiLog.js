// const db = require('./ApiDb.js/index.js');

// 写入日志
module.exports = {
    setlog,
    getlog
}
function setlog(req, data) {
    data = {
        createTime: Date.now(),
        content: data,
        ip: req.connection.remoteAddress,
        user_id: this.userInfo.id,
        message: data.message
    }
    return new Promise((resolve, reject) => {
        this.ApiDb.insert('log', {
            ...data
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
function getlog() {

}