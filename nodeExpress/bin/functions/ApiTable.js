
module.exports = {

    // 用户表
    userInfo: {
        id: {
            default: () => Date.now() + parseInt(Math.random() * 100) + ''
        },
        userName: null,
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
            default: () => Date.now()
        },
        imgurl: null,
        phone: {
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
            type: /[012]/,
            message: '请输入合法性别',
            default: 0
        },
        role: {
            genre: {
                type: /(admin|user|manage)/,
                default: 'user',
                message: '权限类别错误'
            },
            limits: null
        }, // 权限
    }
}