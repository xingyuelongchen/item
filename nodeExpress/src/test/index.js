const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./del');

module.exports = function (req, res, config) {
    try {
        ({ 'get': get, 'post': post, 'delete': del, 'put': put }[req.method.toLowerCase()])(req, res, config)
    } catch (error) {
        res.error(500)
    }
}
