// // 
// //  创建企业信息
// // 
// function get(req, res, config) {
//     res.succress('index - get')
// }
// function post(req, res, config) {
//     res.succress('index - post')
// }
// function del(req, res, config) {
//     res.succress('index - del')

// }
// function put(req, res, config) {
//     res.succress('index - put')
// }
// module.exports = function (req, res, config) {
//     try {
//         ({ 'get': get, 'post': post, 'delete': del, 'put': put }[req.method.toLowerCase()])(req, res, config)
//     } catch (error) {
//         res.error(500)
//     }
// }

class Request {
    constructor(req, res, config) {
        this.req = req;
        this.res = res;
        this.config = config;
        try {
            ({ 'get': this.get, 'post': this.post, 'delete': this.del, 'put': this.put }[req.method.toLowerCase()]).call(this)
        } catch (error) {
            res.error(500)
        }
    }
    get() {
        console.log(this)
        this.res.succress('index - get')
    }
    post() {

    }
    del() {

    }
    put() {

    }
}
module.exports = (req, res, config) => {
    new Request(req, res, config)
};