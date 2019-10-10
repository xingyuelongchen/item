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
    let promise = new Promise((resolve, rejcet) => {
        if (!data || data.constructor != Object || !table) {
            console.log('insert:没有传入正确的数据');
            rejcet('insert 参数错误');
            callback && callback('insert 参数错误')
            return;
        }
        database(fn);
        function fn(db) {
            db.collection(table).insertOne(data, function (err, e) {
                if (err) {
                    reject(err);
                    callback && callback(err)
                    console.log('数据错误' + __dirname + ': ', err);
                } else {
                    resolve(e);
                    callback && callback(null, e);
                }
            });
        }
    });
    return promise;
}
/**
 * 
 * @param {Object} option 配置
 * @param {Function} fn 回调函数
 */

function find(option, fn) {
    return new Promise((resolve, reject) => {
        if (option && (option.constructor == Object)) {
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
                                data = [...data, ...e];
                            } else {
                                data.push(e)
                            }
                        });
                        if (fn && fn.constructor == Function) {
                            fn(null, data, count);
                        } else {
                            resolve(data)
                        }
                    })
                        .catch(err => {
                            reject(err)
                        })
                });
            });
        } else {
            if (fn && fn.constructor == Function) {
                fn(err)
            } else {
                reject('参数错误')
            }
        }
    })

}


function query(option, fn) {
    let promise = new Promise((resolve, reject) => {
        if (option && (option.constructor == Object)) {
            const table = option.table || '';
            const find = option.find || {};
            const sort = option.sort || {};
            const skip = option.skip * 20 || 0;
            const limit = option.limit || 20;
            database((db) => {
                db.collection(table).find(find).count().then(totalPages => {
                    let totalNumber = Math.ceil(totalPages / limit);
                    let pagesNumber = 20;
                    db.collection(table).find(find).sort(sort).skip(skip).limit(limit).toArray((err, data) => {

                        if (fn && fn.constructor == Function && !err) {
                            fn(null, { totalNumber, pagesNumber, data })
                        } else if (!err) {
                            resolve({ totalNumber, pagesNumber, data })
                        } else if (err) {
                            reject(err);
                            fn && fn(err);
                        }

                    })
                })
            })
        }
    });
    return promise;
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
    let promise = new Promise((resolve, reject) => {
        if (option && (option.constructor == Object)) {
            const table = option.table || '';
            const find = option.find || {};
            const value = option.value || {};
            database((db) => {
                db.collection(table).updateMany(find, { $set: value }, function (err, result) {
                    if (fn && fn.constructor == Function) {
                        fn(err, result.result)
                    } else if (!err) {
                        resolve(result.result)
                    } else {
                        reject(err);
                        fn && fn(err);
                    }
                })
            })
        } else {
            console.log(__dirname, ': ', '更新数据库参数错误')
        }
    });
    return promise;
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
    let promise = new Promise((resolve, reject) => {
        if (option && (option.constructor == Object)) {
            const table = option.table || '';
            const find = option.find || {};
            database((db) => {
                db.collection(table).deleteMany(find, false, function (err, result) {
                    if (fn && fn.constructor == Function && !err) {
                        fn(err, result.result)
                    } else if (!err) {
                        resolve(result.result)
                    } else {
                        reject(err);
                        fn && fn(err);
                    }
                })
            })
        }
    });
    return promise;
}

module.exports = { insert, update, del, find, database, query }