module.exports = class admin_mod extends require('./model') {
    /**
     * 分页获取搜索结果
     * @param type
     * @param inputText
     * @param CharType
     * @param currPage
     * @param pageNum
     * @returns {Promise<any>}
     */
    static getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum) {
        pageNum = Number(pageNum);
        currPage = Number(currPage);
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = 'select * from `user` where  ' + CharType + '  like "%' + inputText + '%" and type = ' + type + ' order by modifytime desc LIMIT ?,?'
            console.log(sql)
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static getUsersByTypeAndCharTotal(type, inputText, CharType) {
        return new Promise((resolve, reject) => {
            let sql = 'select count(1) as count from user where  ' + CharType + '  like "%' + inputText + '%" and type = ' + type
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * f发布公告
     * @param title
     * @param classes
     * @returns {Promise<any>}
     */
    static announceMod(title, classes) {
        return new Promise((resolve, reject) => {
            let sql = "insert into `notice` (title,class) values (?,?)"
            this.query(sql, this.formatParams(title, classes)).then((result) => {
                resolve("发布成功")
            }).catch(err => {
                console.log(`发布公告出错:${err.message}`)
                reject("由于网络原因,您的公告并没有发出")
            })

        })
    }

    /**
     * 分页获取所有通知与数量
     * @param pageNum
     * @param currPage
     */
    static getAllNoticeMod(pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise((resolve, reject) => {
            let sql = "select * from notice order by createtime desc LIMIT ?,? "
            this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })

    }

    static getAllNoticeTotal() {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from notice"
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("由于网络原因:获取数量失败")
            })
        })

    }

    /**
     * 取该老师所属班级的全部请假单与数量(分页查询)
     * @param classArr
     * @param currPage
     * @param pageNum
     */
    static getLeaveMod(classArr, currPage, pageNum) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)

        return new Promise((resolve, reject) => {
            let sql = "select * from `leave` where classes = "
            for (let i = 0; i < classArr.length; i++) {
                if (i == 0) sql += " '" + classArr[i] + "' "
                else sql += " or classes= '" + classArr[i] + "' "
            }
            sql += " order by createtime desc limit  " + currPage + " , " + pageNum
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })
        })
    }

    static getLeaveTotal(classArr) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count   from `leave` where classes = "
            for (let i = 0; i < classArr.length; i++) {
                if (i == 0) sql += " '" + classArr[i] + "' "
                else sql += " or classes= '" + classArr[i] + "' "
            }
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })
        })
    }

    /**
     * 获取该用户请假审批与数量(分页
     * @param u_id
     * @param currPage
     * @param pageNum
     */
    static getuserLeaveMod(u_id, currPage, pageNum) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise((resolve, reject) => {
            let sql = "select * from `leave` where u_id= ? order by createtime desc limit ?,? "
            this.query(sql, this.formatParams(u_id, currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假记录")
            })
        })
    }

    static getuserLeaveTotal(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count  from `leave` where u_id= ? "
            this.query(sql, this.formatParams(u_id)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假记录")
            })
        })
    }

    /**
     * 当前请假单审批(修改审批状态)
     * @param l_id
     * @param upState
     */
    static upLeaveStateMod(l_id, upState) {
        l_id = Number(l_id)
        upState = Number(upState)
        return new Promise((resolve, reject) => {
            let sql = "update `leave` set state = ? where l_id =?"
            this.query(sql, this.formatParams(upState, l_id)).then(result => {
                resolve("审批成功")
            }).catch(err => {
                reject("审批失败")
            })
        })
    }

    /**
     *******************增值功能:公告**************************
     */
    /**
     * 获取当前公告已读人的人数
     * @param n_id
     * @returns {Promise<any>}
     */
    static getreadNum(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from `read` where n_id= " + n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取已读公告的人的id
     * @param n_id
     */
    static getreadId(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select u_id from `read` where n_id= " + n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 根据id集合获取已读当前公告的用户数据
     * @param readIdArr
     */
    static getreadByidArr(readIdArr) {
        let sql = ""
        for (let i = 0; i < readIdArr.length; i++) {
            if (i == 0)
                sql += "select id,username,head,classes,createtime from `user` where  id=  " + readIdArr[i].u_id
            else
                sql += " or id= " + readIdArr[i].u_id
        }
        // sql+=
        return new Promise((resolve, reject) => {
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 取当前通知的详情信息
     * @param n_id
     * @constructor
     */
    static NoticeDetailsMod(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select * from `notice` where n_id =" + n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     *  获取当前公告通知的总人数
     * @param classes
     * @constructor
     */
    static NoticeDetailsTotal(classes) {
        let sql = ""
        let classesArr = classes.split(";")
        for (let i = 0; i < classesArr.length; i++) {
            if (i == 0)
                sql += "select count(1) as count from `user` where classes= '" + classesArr[i] + "'"
            else
                sql += " or classes = '" + classesArr[i] + "'"
        }
        return new Promise((resolve, reject) => {
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取失败${err}`)
                reject(err)
            })
        })

    }

    /**
     *  获取已读人的阅读时间与uid
     * @param n_id
     * @returns {Promise<any>}
     */
    static getreadTime(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select u_id,readtime from `read` where n_id= " + n_id
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 当前 公告删除功能(同时清空该公告的被阅读记录)
     * @param n_id
     */
    static delNoticeMod(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "delete from `notice` where n_id= " + n_id
            this.query(sql).then(result => {
                resolve("删除该公告成功")
            }).catch(err => {
                reject("删除该公告失败")
            })
        })

    }

    static delReadMod(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "delete from `read` where n_id =" + n_id
            this.query(sql).then(() => {
                resolve(",该公告的阅读记录删除成功")
            }).catch(() => {
                reject("该公告的阅读记录删除失败")
            })

        })

    }

    /**
     * ************************增值功能:班级添加******************************
     */
    /**
     * 获取所有班级
     */
    static getClassMod() {
        return new Promise((resolve, reject) => {
            let sql = "select * from `class` "
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("未获得班级")
            })
        })
    }

    static addClassesMod(classAll, classes) {
            return new Promise((resolve, reject)=>{
                for (let i=0;i<classAll.length;i++){
                    if (classAll[i].classes==classes)  {
                        reject("重复添加")
                        return
                    }
                }
                let sql="insert into `class` (classes) values (?) "
                this.query(sql,this.formatParams(classes)).then(()=>{
                    resolve("添加成功")
                }).catch(()=>{
                    reject("添加失败")
                })
            })
    }

    /**
     * 模糊查询班级分页
     * @param classes
     * @param pageNum
     * @param currPage
     * @returns {Promise<any>}
     */
    static getClassesSearMod(classes,pageNum, currPage){
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise((resolve, reject)=>{
            let sql="select * from `class` where classes like '%"+classes+"%' limit ?,?"
            this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                resolve(result)
            }).catch(()=>{
                reject("未获得班级")
            })
        })
    }
    static getClassesSearTotal(classes){
        return new Promise((resolve, reject)=>{
            let sql="select count(1) as count from `class` where classes like '%"+classes+"%' "
            console.log(sql)
            this.query(sql).then(result=>{
                resolve(result)
            }).catch(()=>{
                reject("未获得班级")
            })
        })
    }


}

