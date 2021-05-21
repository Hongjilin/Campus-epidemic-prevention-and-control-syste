// 操作数据库模块 扫地僧 2019年5月30日19:58:46
var mysql = require('mysql');
let logPrefix=mysql
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : '3306',
    database : 'xunke725'
});

/**
 * 增删改查 通用组件  同步写法
 *
 * @param sql 增删改查sql 含占位符
 * @param params 跟占位符顺序匹配的参数数组，要求跟sql的占位符数量一样多
 */
let exec =  function (sql,params) {
    // 返回一个 Promise
        return  new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                } else {


                    //query执行sql语句
                    connection.query(sql, params, (err, results) => {

                        if (err) {
                            console.error(err)
                          //  reject(err)
                        } else {
                            // console.log(`${logPrefix}result : ${JSON.stringify(results)}`);
                            resolve(results)
                        }
                        // 结束会话 释放链接
                        connection.release()
                    })


                }
            })
        })
}

/**
 * 将所有的参数格式化成数组 参数是可变参数（可变参数在函数声明的时候不写）
 * @returns {Array}
 */
let formatParams = function () {
    var array = [];

    //js中有个变量arguments,可以访问所有传入的值
    for(var i = 0, l = arguments.length; i < l; i++){
        array.push(arguments[i]);
    }
    return array;
}
module.exports = {exec, formatParams};
