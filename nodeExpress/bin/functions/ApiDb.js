const database = require("../database");

// insert('user',array)
/**
 * 
 * @param {String} table  数据表名
 * @param {Object} data  需要插入的数据对象
 * @param {Function} callback 回调函数
 * 
 */
function insert(table, data, callback) {
    if (!data || data.constructor != Object || !table) {
        console.log('insert:没有传入正确的数据');
        return;
    }
    database(fn);
    function fn(db) {
        db.collection(table).insertOne(data, function (err, e) {
            if (err) {
                callback(err)
                console.log('数据错误' + __dirname + ': ', err);
            } else {
                callback(null, e)
                // console.log({ message: '数据插入成功' })
            }
        });
    }
}
/**
 * 
 * @param {Object} option 配置
 * @param {Function} fn 回调函数
 */

function find(option, fn) {
    if (option && (option.constructor == Object) && fn && fn.constructor == Function) {
        const table = option.table || '';
        const find = option.find || {};
        const sort = option.sort || {};
        const skip = option.skip || 0;
        const limit = option.limit || 50;
        database((db) => {
            db.collection(table).find(find).count().then(e => {
                let count = Math.ceil(e / limit);
                let len = limit ? 1 : count;
                let dataArr = [];
                for (let i = 0; i < len; i++) {
                    dataArr.push(db.collection(table).find(find).sort(sort).skip(skip).limit(limit).toArray())
                }

                Promise.all(dataArr).then(e => {
                    let data = [];
                    e.forEach(e => {
                        if (e.constructor == Array) {
                            e.map(e => {
                                data.push(e)
                            });
                        } else {
                            data.push(e)
                        }
                    });
                    fn(null, data, count);
                })
                    .catch(err => {
                        console.log(err)
                    })
            });
        });
    } else {
        fn('请传入必要的参数');

    }
}


function query(option, fn) {
    if (option && (option.constructor == Object) && fn && fn.constructor == Function) {
        const table = option.table || '';
        const find = option.find || {};
        const sort = option.sort || {};
        const skip = option.skip*20 || 0;
        const limit = option.limit || 20;
        database((db) => {
            db.collection(table).find(find).count().then(totalPages => {
                let totalNumber = Math.ceil(totalPages / limit);
                let pagesNumber = 20;
                db.collection(table).find(find).sort(sort).skip(skip).limit(limit).toArray((err, data) => {
                    fn(null, { totalNumber, pagesNumber, data })
                })
            })
        })
    }
}

/**
 * 
 * @param {Object} option -包含
 *  {
 *  table - 表名 String
 *  find  - 更新条件 Object
 *  value - 新数据 Object
 * }
 * @param {Function} fn -回调函数 
 */

function update(option, fn) {
    if (option && (option.constructor == Object) && fn && fn.constructor == Function) {
        const table = option.table || '';
        const find = option.find || {};
        const value = option.value || {};
        database((db) => {
            db.collection(table).updateMany(find, { $set: value }, function (err, result) {
                fn(err, result.result)
            })
        })
    } else {
        fn('请传入必须的参数')
    }
    return true;
}
/**
* 
 * @param {Object} option -包含
 *  {
 *  table - 表名 String
 *  find  - 更新条件 Object
 *  value - 新数据 Object
 * }
 * @param {Function} fn -回调函数
 */

function del(option, fn) {
    if (option && (option.constructor == Object) && fn && fn.constructor == Function) {
        const table = option.table || '';
        const find = option.find || {};
        database((db) => {
            db.collection(table).deleteMany(find, false, function (err, result) {
                fn(err, result.result)
            })
        })
    }
}

module.exports = { insert, update, del, find, database, query }