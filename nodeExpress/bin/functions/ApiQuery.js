// url 查询路径
module.exports = (req) => {
    let query = req.query;
    let params = {};
    for (let k in query) {
        if (k == 'page') {
            params['skip'] = query[k];
        }
        if (k == 'search') {
            params['find']
        }
    }
}