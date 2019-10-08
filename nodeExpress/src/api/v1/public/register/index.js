const md5 = require('md5');

// 用户注册
function post(req, res, config) {
    let { name, password } = req.body;

    let isError = res.ApiExp({ name, password }, res.ApiTable.userInfo);
    let userInfo = isError.toData;

    if (isError.error) {
        res.info(isError.message);
        return;
    }
    if (!res.ApiExp(name, 'email').error) {
        userInfo.name = name;
        userInfo.email = name;
    } else if (!res.ApiExp(name, 'phone').error) {
        userInfo.name = name;
        userInfo.phone = name;
    } else if (name === password) {
        res.info('密码不能与用户名相同')
    }
    res.ApiDb.find({
        table: config.db.table.user,
        find: { $or: [{ name }, { phone: name }, { email: name }] },
    }, (err, data, count) => {

        if (data.length > 1) {
            res.info('该账号已存在，请重新输入')
        } else {
            if (res.ApiExp(password, /^[\w\d]{6,32}$/).error) {
                res.info('密码格式不正确，只能是6-32位字母和数字')
                return;
            }
            userInfo.password = md5(password);
            res.ApiDb.insert(config.db.table.user, userInfo, (err, data) => {
                if (err) { res.error(500); return };
                res.succress('注册成功')
            })
        }
    })

}



module.exports = function (req, res, config) {
    try {
        post(req, res, config)
    } catch (error) {
        res.error(500)
    }
}