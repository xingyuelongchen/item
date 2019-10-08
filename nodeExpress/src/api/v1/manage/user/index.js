
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
    createTime: {
        required: true,
        type: Date,
        default: Date.now()
    },
    imgurl: null,
    phone: {
        required: false,
        type: 'phone',
        message: '请输入正确的手机号'
    },
    email: {
        type: 'email',
        message: '请输入正确的Email地址'
    },
    qq: Number,
    wechat: null,
    age: Number,
    city: null,
    country: null,
    address: null,
    uid: 'uid',
    sex: {
        type: /[123]/,
        message: '请输入合法性别',
        default: 0
    },
    role: {
        admin: Array,
        user: Array,
        other: Array
    }, // 权限
}

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
    res.ApiDb.query({
        table: 'user',
        // 这里还差分页查询
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
    res.send('manage - post')
}
// 删除用户
function del(req, res, config) {
    res.send('manage - del')

}
// 更新用户信息
function put(req, res, config) {
    res.send('manage - put')
}