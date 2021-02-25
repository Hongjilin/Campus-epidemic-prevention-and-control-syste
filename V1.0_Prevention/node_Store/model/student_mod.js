/**
 * 用户数据模型
 */
let crypto = require('crypto')

let jwtUtils = require('../utils/jwtUtils')
module.exports = class User_mod extends require('./model1') {

    /**
     * 写入健康表
     * @param u_id
     * @returns {Promise<any>}
     */
    static setHealth(u_id,temperature,hot,gohubei,hubeiren,fever,leave,hesuan,mask,masknum,kill) {
        var myDate = new Date();
     let createtime=  myDate.toLocaleDateString()//；可以获取bai当du前日期
        return new Promise((resolve, reject) => {
        let sql="insert into health(u_id,temperature,hot,gohubei,hubeiren,fever,leaveout,hesuan,mask,masknum,kills) values (?,?,'"+hot+"','"+gohubei+
              "','"+hubeiren+"','"+fever+"','"+leave+"','"+hesuan+"','"+mask+"',"+masknum+",'"+kill+"')"
            this.query(sql, this.formatParams(u_id,temperature)).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * 获取当天健康表
     * @param newDate
     * @param lastDate
     * @returns {Promise<any | never>}
     */
    static gethealthNowDay(newDate,lastDate) {
        return new Promise((resolve, reject) => {
            let sql="SELECT * FROM health WHERE createtime BETWEEN '"+newDate+"' AND '"+lastDate+"'";
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`我的当日健康表失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取当天健康表数量
     * @param newDate
     * @param lastDate
     * @returns {Promise<any | never>}
     */
    static gethealthNowDaySize(newDate,lastDate) {
        return new Promise((resolve, reject) => {
            let sql="select count(1) as count from  health WHERE createtime BETWEEN '"+newDate+"' AND '"+lastDate+"'";
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`我的当日健康表失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 分页获取当天健康表
     * @param newDate
     * @param lastDate
     * @returns {Promise<any | never>}
     */
    static gethealthNowDayPage(newDate,lastDate,currPage,pageNum) {
        currPage=Number(currPage)
        pageNum=Number(pageNum)
        return new Promise((resolve, reject) => {
            let sql="SELECT * FROM health WHERE createtime BETWEEN '"+newDate+"' AND '"+lastDate+"' LIMIT ?,?";
            this.query(sql ,this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`我的当日健康表失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 根据id获取用户当日报表数据
     * @param newDate
     * @param lastDate
     * @returns {Promise<any | never>}
     */
    static getHealthNowDayByid(newDate,lastDate,u_id) {
        console.log(u_id)
        // u_id=Number(u_id)
        return new Promise((resolve, reject) => {
            let sql="SELECT * FROM health WHERE (createtime BETWEEN '"+newDate+"' AND '"+lastDate+"') AND  u_id = "+u_id;
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`我的当日健康表失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取所有健康表
     * @returns {Promise<any | never>}
     */
    static getAllHealth() {
        return new Promise((resolve, reject) => {
            let sql="SELECT * FROM health ";
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取所有健康表失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 分页获取我的通知
     * @param u_class
     * @param pageNum
     * @param currPage
     */
    static getNotice(u_class, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage*pageNum)
        console.log(pageNum)
        return new Promise((resolve, reject) => {
            let sql =   "  SELECT  * FROM notice WHERE class like '%"+u_class+"%' order by createtime desc LIMIT ?,?"
            console.log("------ss----")
            console.log(sql)
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取我的通知失败:${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 获取我的通知总数量
     * @param u_class
     */
    static getNoticeSize(u_class) {
        return new Promise((resolve, reject) => {
            let sql =   " select count(1) as count from notice WHERE class like '%"+u_class+"%'"
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取我的通知失败:${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 获取我的已读通知
     * @param u_id
     */
    static getNoticeRead(u_id) {
        u_id=Number(u_id)
        return new Promise((resolve, reject) => {
            let sql =   " SELECT  * FROM `read` WHERE u_id= "+u_id
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取我的通知失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 已读转未读
     * @param u_id
     */
    static goweidu(u_id,n_id) {
        u_id=Number(u_id)
        return new Promise((resolve, reject) => {
            // let sql =   " SELECT  * FROM `read` WHERE u_id= "+u_id
            let sql = "DELETE FROM `read` WHERE u_id = "+u_id+" and n_id= "+n_id
            console.log(sql)
            this.query(sql).then(result => {
                resolve("成功修改为未读")
            }).catch(err => {
                console.log(`获取我的通知失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 未读转已读
     * @param u_id
     */
    static goyidu(u_id,n_id) {
        u_id=Number(u_id)
        return new Promise((resolve, reject) => {
            let sql =   "INSERT INTO   `read` (u_id, n_id) VALUES ("+u_id+","+n_id+")"
            console.log(sql)
            this.query(sql).then(result => {
                resolve("成功修改为已读")
            }).catch(err => {
                console.log(`修改失败:${err.message}`)
                reject(err)
            })
        })
    }
    /**
     *写入请假表
     * @param u_id
     */
    static setLeave(u_id,classes,reason,leavetype,starttime,endtime) {
        u_id=Number(u_id)
        return new Promise((resolve, reject) => {
            let sql =   "INSERT INTO   `leave` (u_id, reason,leavetype,starttime,endtime,classes,state) VALUES ("
                +u_id+",'"+reason+"','"+leavetype+"','"+starttime+"','"+endtime+"','"+classes+"',0)"
            console.log(sql)
            this.query(sql).then(result => {
                resolve("提交申请成功")
            }).catch(err => {
                console.log(`提交失败:${err.message}`)
                reject(err)
            })
        })
    }

}
