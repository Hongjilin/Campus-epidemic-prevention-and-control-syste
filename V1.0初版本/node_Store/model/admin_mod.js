/**
 * 用户数据模型
 */
let crypto = require('crypto')

let jwtUtils = require('../utils/jwtUtils')
module.exports = class User_mod extends require('./model1') {
    /**
     * 发布公告
     * @param
     */
    static announce(title,classes) {
        return new Promise((resolve, reject) => {
            let sql =   "INSERT INTO   `notice` (title, class) VALUES ('"+title+"','"+classes+"')"
            console.log(sql)
            this.query(sql).then(result => {
                resolve("成功发布")
            }).catch(err => {
                console.log(`由于网络问题,您的公告并没有发出:${err.message}`)
                reject("由于网络问题,您的公告并没有发出")
            })
        })
    }
    /**
     * 添加班级
     * @param classes
     */
    static addClasses(classes,classAll) {
        return new Promise((resolve, reject) => {
            for (let i=0;i<classAll.length;i++) {
                if (classes==classAll[i].classes){
                    resolve("重复添加")
                    return;
                }
            }
            let sql =   "INSERT INTO   `class`  (classes) VALUES ('"+classes+"') "
            this.query(sql).then(result => {
                resolve("添加成功")
            }).catch(err => {
                console.log(`由于网络问题,您的公告并没有发出:${err.message}`)
                reject("由于网络问题,添加班级失败")
            })
        })
    }
    /**
     * 获取班级
     * @param classes
     */
    static getClasses() {
        return new Promise((resolve, reject) => {
            let sql =   " select * from `class` "
            this.query(sql).then(result => {
                resolve(result)
                return result;
            }).catch(err => {
                console.log(`由于网络问题,未获得:${err.message}`)
                reject("由于网络问题,未获得班级")
            })
        })
    }
    /**
     * 获取班级
     * @param classes
     */
    static getClassesTotal() {
        return new Promise((resolve, reject) => {
            let sql =   "select count(1) as count from `class` "
            this.query(sql).then(result => {
                resolve(result)
                return result;
            }).catch(err => {
                console.log(`由于网络问题,未获得:${err.message}`)
                reject("由于网络问题,未获得班级")
            })
        })
    }

    /**
    * 模糊查询班级
     * @param input_class
     * @param pageNum
     * @param currPage
     * @returns {Promise<any>}
     */
    static getClassesSear(input_class, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        return new Promise((resolve, reject) => {
            let sql =   "  SELECT  * FROM `class` WHERE classes like '%"+input_class+"%'  LIMIT ?,? "
            console.log(sql)
            this.query(sql,this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
                return result;
            }).catch(err => {
                console.log(`由于网络问题,未获得:${err.message}`)
                reject("由于网络问题,未获得班级")
            })
        })
    }
    /**
     * 获取该老师所管班级的学生请假单
     * @param
     */
    static getLeave(classArr,currPage, pageNum) {
        currPage=Number(currPage)
        pageNum=Number(pageNum)
        // currPage= pageNum * currPage
        return new Promise((resolve, reject) => {
            let sql="select * from `leave`  where classes = "
        for (let i=0;i<classArr.length;i++){
            if (i==0)   sql+=   "  '"+classArr[i]+"'"
            else   sql+=   " or classes = '"+classArr[i]+"'"
        }
        sql+=" order by createtime desc   LIMIT  "+  currPage   +"  ,  "+pageNum
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })

        })
    }
    /**
     * 获取该老师所管班级的学生请假单
     * @param
     */
    static getuserLeave(uid,currPage, pageNum) {
        currPage=Number(currPage)
        pageNum=Number(pageNum)
        currPage=Number(pageNum*currPage)
        return new Promise((resolve, reject) => {
            let sql="select * from `leave` where u_id ="+uid
        sql+=" order by createtime desc  LIMIT ?,?"
            this.query(sql,this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假")
            })

        })
    }
    /**
     * 获取用户下的班级请假单所有数量
     * @param
     */
    static getLeaveSize(classArr) {
        return new Promise((resolve, reject) => {
            let sql="select count(1) as count from `leave` where classes ="
        for (let i=0;i<classArr.length;i++){
            if (i==0)   sql+=   "  '"+classArr[i]+"'"
            else   sql+=   " or classes = '"+classArr[i]+"'"
        }
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })

        })
    }
    /**
     * 获取用户下的班级请假单所有数量
     * @param
     */
    static getuserLeaveSize(uid) {
        return new Promise((resolve, reject) => {
            let sql="select count(1) as count from  `leave` where u_id ="+uid
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })

        })
    }
    /**
     * 修改当前请假单审批状态
     * @param
     */
    static upLeaveState(l_id,upState) {
        l_id=Number(l_id)
        upState=Number(upState)
        return new Promise((resolve, reject) => {
            // let sql='UPDATE `user` SET state="' + upState + '"  WHERE l_id = ' + l_id+" ''
            let sql="UPDATE `leave` SET state = "+upState+" WHERE l_id ="+l_id
            console.log(sql)
            this.query(sql).then(result => {
                resolve("审批修改成功")
            }).catch(err => {
                reject("由于网络原因,审批失败")
            })

        })
    }

    /**
     * 分页获取我的通知
     * @param pageNum
     * @param currPage
     */
    static getAllNotice(pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        return new Promise((resolve, reject) => {
            let sql =   "  SELECT  * FROM notice  order by createtime desc  LIMIT ?,?"
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取我的通知失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当前公告已读人数
     * @param n_id
     */
    static getreadNum(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql =   " select count(1) as count from  `read`   where n_id = "+n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当前公告通知总人数
     * @param n_id
     */
    static NoticeAllNum(classes) {
        let sql = ""
       let classesArr=  classes.split(";")
        for (let i=0;i<classesArr.length;i++){
            if (i==0)
        sql+= " select count(1) as count from  `user`   where    classes = '"+classesArr[i]+"'"
            else
       sql+= " or    classes = '"+classesArr[i]+"'"
        }
        return new Promise((resolve, reject) => {
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 根据id集合当前公告通知用户数据
     * @param n_idArr
     */
    static getreadById(n_idArr) {
        let sql = ""
        for (let i=0;i<n_idArr.length;i++){
            if (i==0)
        sql+= " select username,head,classes,createtime from  `user`   where    id = "+n_idArr[i].u_id
            else
       sql+= "  or   id = "+n_idArr[i].u_id
        }
        console.log(sql)
        return new Promise((resolve, reject) => {
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当前公告已读人的id
     * @param n_id
     */
    static getreadId(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql =   " select u_id from  `read`   where n_id = "+n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当前公告已读人的时间与u_id
     * @param n_id
     */
    static getreadtime(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql =   " select u_id,readtime from  `read`   where n_id = "+n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当前公告详情
     * @param n_id
     */
    static NoticeDetails(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql =   " select * from  `notice`   where n_id = "+n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取阅读失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 删除用户
     * @param u_id
     * @returns {Promise<any>}
     */
    static delNotice(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "DELETE  FROM `notice` WHERE n_id = "+n_id
            this.query(sql).then(result => {
                resolve("删除公告成功");
            }).catch(err => {
                reject("删除公告失败");
            })
        })
    }
    /**
     * 删除用户的阅读表
     * @param n_id
     * @returns {Promise<any>}
     */
    static delReads(n_id) {
        n_id=Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "DELETE  FROM `read` WHERE n_id = "+n_id
            this.query(sql).then(result => {
                resolve(",删除该公告被阅读记录成功");
            }).catch(err => {
                reject(",删除该公告被阅读记录失败");
            })
        })
    }

    /**
     * 获取我的通知总数量
     * @param u_class
     */
    static getAllNoticeSize() {
        return new Promise((resolve, reject) => {
            let sql =   " select count(1) as count from notice "
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取所有通知数量失败:${err.message}`)
                reject("由于网络原因,获取所有通知数量失败")
            })
        })

    }
    /**
     * 分页获取模糊搜索结果
     * @param pageNum
     * @param currPage
     */
    static getUsersByTypeAndChar(type,inputText,CharType,currPage,pageNum) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        type=Number(type)
        return new Promise((resolve, reject) => {
            let  sql= "  SELECT  * FROM `user` WHERE "+CharType+" like '%"+inputText+"%' and type="+type+"  LIMIT ?,?"
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`您要的数据在赶来的路上:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取模糊搜索结果总数量
     */
    static getUsersByTypeAndCharSize(type,inputText,CharType) {
        type=Number(type)
        return new Promise((resolve, reject) => {
            let  sql= " select count(1) as count from  `user` WHERE "+CharType+" like '%"+inputText+"%' and type="+type
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`您要的数据在赶来的路上:${err.message}`)
                reject(err)
            })
        })
    }

}
