/**
 * 用户数据模型
 */
let crypto = require('crypto')

let jwtUtils = require('../utils/jwtUtils')
module.exports = class User_mod extends require('./model1') {

    /**
     * 根据用户名和密码验证登录
     * 获取用户数据
     */
    static getUser(name, pwd,type) {
        type=Number(type)
        return new Promise((resolve, reject) => {
            console.log(name)
            let sql = "select * from user where binary username= '" + name + "' and password ='" + pwd + "' and type =  "+type
         console.log(sql)
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                console.log("登录失败")
                reject("登陆失败");
            })
        })
    }
    /**
     * 根据用户id获取id
     * 获取用户数据
     */
    static getUserDataById(u_id) {
        u_id=Number(u_id)
        return new Promise((resolve, reject) => {

            // let md5 = crypto.createHash('md5')
            // let newpwd = md5.update(pwd).digest('hex')
            let sql = "select * from user where id= " +u_id
         console.log(sql)
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                console.log("h")
                reject("获取失败");
            })
        })
    }

    /**
     * 写入头像
     * @param head_img
     */
    static upUserHead(head_img, u_id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `user` SET head="' + head_img + '"  WHERE id = ' + u_id
            // let sql="insert into user (token,mailbox) values(?,?)"
            this.query(sql).then(result => {
                console.log("上传成功")
                resolve(result);
            }).catch(err => {
                console.log("上传失败")
                reject(err);
            })
        })
    }

    /**
     * 修改用户信息
     * @param u_id
     * @param username
     * @param sex
     * @param address
     * @param type
     * @returns {Promise<any>}
     */
    static upUserdata(u_id, username,sex,address,type) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `user` SET username="' + username + '",  sex ="'+sex+'" , address= "'+address+'" , type="'+type+'" WHERE id = ' + u_id
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })

    }
    /**
     * 删除用户
     * @param u_id
     * @returns {Promise<any>}
     */
    static delUser(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE  FROM user WHERE id = "+u_id
            this.query(sql).then(result => {
                resolve("删除用户成功");
            }).catch(err => {
                reject("删除用户失败");
            })
        })
    }
    /**
     * 删除用户的阅读表
     * @param u_id
     * @returns {Promise<any>}
     */
    static delRead(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE  FROM `read` WHERE u_id = "+u_id
            this.query(sql).then(result => {
                resolve(",删除该用户阅读记录成功");
            }).catch(err => {
                reject(",删除该用户阅读记录失败");
            })
        })
    }
    /**
     * 修改个人密码
     * @param
     * @param u_id
     * @returns {Promise<any>}
     */
    static upUserPwd(oldPwd,newPwd, u_id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `user` SET password="' + newPwd + '"  WHERE id = ' + u_id+" and password="+oldPwd
            // let sql="insert into user (token,mailbox) values(?,?)"
            this.query(sql).then(result => {
                console.log(result)
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**
     * 根据类型获取用户信息列表
     * @param type
     * @returns {Promise<any>}
     */
    static getUsersByType(type) {
        return new Promise((resolve, reject) => {
            let sql = "select * from user where type =" + type
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })

    }
    /**
     * 根据类型获取用户信息列表(分页获取)
     * @param type
     * @returns {Promise<any>}
     */
    static getUsersByTypePage(type,currPage,pageNum) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        return new Promise((resolve, reject) => {
            let sql = "select * from user where type =" + type+"  order by modifytime desc  LIMIT ?,?"
            this.query(sql,this.formatParams(currPage, pageNum)).then(result => {
                resolve(result);
            }).catch(err => {
                console.log("没有")
                reject(err);
            })
        })
    }

    static getUsersTotalByType(type) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from user where type =" + type
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**
     * 分页获取所有用户信息列表
     * @returns {Promise<any>}
     */
    static getAllUsers( pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        return new Promise((resolve, reject) => {
            // let sql = "select * from user"
            let sql =  "SELECT  * FROM user order by modifytime desc  LIMIT ?,?"
            this.query(sql,this.formatParams(currPage, pageNum)).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })

    }
    /**
     * 获取所有用户信息列表与数量
     * @returns {Promise<any>}
     */
    static getAllUsersSize() {
        return new Promise((resolve, reject) => {
            // let sql = "select * from user"
            let sql =  "select count(1) as count from user"
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**
     * 获取所有用户信息列(用于验证导入)
     * @returns {Promise<any>}
     */
    static getAllUsersX() {
        return new Promise((resolve, reject) => {
            // let sql = "select * from user"
            let sql =  "select * from user"
            this.query(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**
     * 将redis的inxlsx数据插入数据库(数据库中没有的用户插入)
     * @param inXlsxArr
     * @returns {Promise<any>}
     */
    static inXlsxData(inXlsxArr) {
        console.log("进行插入")
        return new Promise((resolve, reject) => {
            for (let i=0;i<inXlsxArr.length;i++){
                let sql = "insert into user (id, username, password,head,address, sex,classes,type) values("+inXlsxArr[i].id+",'"+inXlsxArr[i].username+"','"+inXlsxArr[i].password+
                    "','"+inXlsxArr[i].head+"','"+inXlsxArr[i].address+"','"+inXlsxArr[i].sex+"','"+inXlsxArr[i].classes+"',"+inXlsxArr[i].type+") "
                this.query(sql).then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                })
            }
        })
    }
    /**
     * 将redis的inxlsx数据更新到数据库(数据库中已经有的用户更新)
     * @param upXlsxArr
     * @returns {Promise<any>}
     */
    static upXlsxData(upXlsxArr) {
        console.log("进行更新")
        return new Promise((resolve, reject) => {
            for (let i=0;i<upXlsxArr.length;i++){
                let sql = 'UPDATE `user` SET username="' + upXlsxArr[i].username + '" ,password="' + upXlsxArr[i].password + '" ,head="' + upXlsxArr[i].head + '"' +
                    ' ,address="' + upXlsxArr[i].address  +'" ,sex="' + upXlsxArr[i].sex +'" ,classes="' + upXlsxArr[i].classes +'" ,type=' + upXlsxArr[i].type + '' +
                    ' WHERE id = ' + upXlsxArr[i].id
                this.query(sql).then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                })
            }
        })
    }

}
