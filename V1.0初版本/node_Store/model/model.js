const mysql = require('mysql')

/**
 *
 * 自己封装的数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {
    // 连接对象
    // static conn = null;
    /**
     * 数据库连接方法封装
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'blog',
            timezone: '+08:00' //东八时区
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection()

            Model.conn.query(sql, params, (err, results) => {
                if (err) {
                    //在外部用catch截取
                    console.error(err)
                } else {
                    resolve(results)
                }
            })

            this.end()
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