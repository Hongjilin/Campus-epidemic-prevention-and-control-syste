module.exports = class student_mod extends require('./model') {
    /**
     * 分页获取我的通知与数量
     * @param u_classes
     * @param pageNum
     * @param currPage
     * @returns {Promise<any>}
     */
    static getNoticeMod(u_classes, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = "select * from notice where class like '%" + u_classes + "%' order by createtime desc limit ?,? "
            console.log(sql)
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static getNoticeTotal(u_classes) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from notice  where class like '%" + u_classes + "%'"
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取的我通知已读列表(供已读未读状态渲染
     * @param u_id
     */
    static getNoticeReadMod(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "select * from `read` where u_id= ? "
            this.query(sql, this.formatParams(u_id)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 已读转未读
     * @param u_id
     * @param n_id
     */
    static goweiduMod(u_id, n_id) {
        u_id = Number(u_id)
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "delete from `read` where u_id = ? and n_id = ? "
            this.query(sql, this.formatParams(u_id, n_id)).then(result => {
                resolve("已读转未读成功")
            }).catch(err => {
                reject("已读转未读失败")
            })
        })
    }

    /**
     * 未读转已读
     * @param u_id
     * @param n_id
     */
    static goyiduMod(u_id, n_id) {
        u_id = Number(u_id)
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            // let sql= "delete from `read` where u_id = ? and n_id = ? "
            let sql = "insert into `read` (u_id,n_id) values (?,?) "
            this.query(sql, this.formatParams(u_id, n_id)).then(result => {
                resolve("未读转已读成功")
            }).catch(err => {
                reject("未读转已读失败")
            })
        })
    }

    /**
     * *************************健康填报表**************************************
     */
    /**
     *健康填报表提交
     * @param u_id
     * @param temperature
     * @param hot
     * @param gohubei
     * @param hubeiren
     * @param fever
     * @param leave
     * @param hesuan
     * @param mask
     * @param masknum
     * @param kill
     */
    static sethealthMod(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill) {
        return new Promise((resolve, reject) => {
            let sql = "insert into health(u_id, temperature, hot, gohubei, hubeiren, fever, leaveout, hesuan, mask, masknum, kills) values (?,?,?,?,?,?,?,?,?,?,?)"
            this.query(sql, this.formatParams(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill))
                .then(result => {
                    resolve("健康填报表提交成功")
                }).catch(err => {
                reject("健康填报表提交失败")
            })
        })
    }

    /**
     * 分页获取当天填报表与总数量
     * @param newDate
     * @param lastDate
     * @param currPage
     * @param pageNum
     */
    static gethealthNowDayPageMod(newDate, lastDate, currPage, pageNum) {
        currPage = Number(currPage)
        pageNum = Number(pageNum)
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = "select * from health where createtime between ? and ? LIMIT  ?,? "
            this.query(sql, this.formatParams(newDate, lastDate, currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static gethealthNowDayPageTotal(newDate, lastDate) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count  from health where createtime between ? and ?"
            this.query(sql, this.formatParams(newDate, lastDate)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取当天某用户报表
     * @param u_id
     * @param newDate
     * @param lastDate
     */
    static getHealthNowDayByidMod(u_id, newDate, lastDate) {
        
        return new Promise((resolve, reject) => {
            let sql = "select * from health where (createtime between ? and ?) and u_id = ?"
            this.query(sql, this.formatParams(newDate, lastDate, u_id)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("查询失败")
            })
        })
    }

    /**
     * 获取当天所有填报表
     * @param nowDate
     * @param lasDate
     */
    static gethealthNowDayMod(nowDate, lasDate) {
        return new Promise((resolve, reject) => {
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql, this.formatParams(nowDate, lasDate)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取当月所有填报表
     * @param nowDate
     * @param lasDate
     */
    static gethealthNowMonthMod(nowDate, lasDate) {
        return new Promise((resolve, reject) => {
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql, this.formatParams(nowDate, lasDate)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取所有填报表
     */
    static getAllHealthMod() {
        return new Promise((resolve, reject) => {
            let sql = "select * from health"
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 学生请假表申请
     * @param u_id
     * @param classes
     * @param reason
     * @param leavetype
     * @param starttime
     * @param endtime
     */
    static setLeaveMod(u_id, classes, reason, leavetype, starttime, endtime) {
        u_id=Number(u_id)
        return new Promise((resolve, reject)=>{
            let sql="insert into `leave` (u_id, classes, reason, leavetype, starttime, endtime,state) values (?,?,?,?,?,?,0) "
            this.query(sql,this.formatParams(u_id, classes, reason, leavetype, starttime, endtime)).then(()=>{
                resolve("提交请假申请成功")
            }).catch(err=>{
                reject("提交请假申请失败")
            })
        })
    }


}