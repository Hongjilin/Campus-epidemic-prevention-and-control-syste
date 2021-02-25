const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'vue_store',
    // timezone: '+08:00' //东八时区
    timezone: 'local',
})

/**
 *
 * 自己封装的数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    connection.release()
                } else {
                    //query执行sql语句
                    connection.query(sql, params, (err, results) => {
                        //在外部用catch截取
                        if (err) {
                            console.error(err)
                             reject(err)
                        } else {
                            resolve(results)
                        }
                        // 结束会话 释放链接
                        connection.release()
                    })
                }
            })
        })
    }

    static formatParams() {
        var array = [];
        //js中有个变量arguments,可以访问所有传入的值
        for (var i = 0, l = arguments.length; i < l; i++) {
            array.push(arguments[i]);
        }
        return array;
    }
}