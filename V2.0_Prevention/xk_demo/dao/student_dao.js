const jwtUtil = require('../utils/jwtUtils')
module.exports = class student_dao extends require('../model/student_mod') {
    /**
     * f分页获取我的通知与数量
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getNotice(req, resp) {
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_classes = verify.classes
        let pageNum = req.query.pageNum
        let currPage = req.query.currPage
        let data = await this.getNoticeMod(u_classes, pageNum, currPage)
        let total = await this.getNoticeTotal(u_classes)
        resp.send({data, total: total[0].count})
    }

    /**
     * 获取的我通知已读列表(供已读未读状态渲染
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getNoticeRead(req, resp) {
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_id = verify.id
        let data = await this.getNoticeReadMod(u_id)
        resp.send(data)
    }

    /**
     * 已读转未读
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async goweidu(req, resp) {
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_id = verify.id
        let n_id = req.query.n_id
        let results = await this.goweiduMod(u_id, n_id)
        resp.send(results)
    }

    /**
     * 未读转已读
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async goyidu(req, resp) {
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_id = verify.id
        let n_id = req.query.n_id
        let results = await this.goyiduMod(u_id, n_id)
        resp.send(results)
    }

    /**
     * *************************健康填报表**************************************
     */
    /**
     * 健康填报表提交
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async sethealth(req, resp) {
        let body = req.body
        let token = body.token
        let temperature = body.temperature
        let hot = body.hot
        let gohubei = body.gohubei
        let hubeiren = body.hubeiren
        let fever = body.fever
        let leave = body.leave
        let hesuan = body.hesuan
        let mask = body.mask
        let masknum = body.masknum
        let kill = body.kill
        //解密
        let verify = await jwtUtil.verifysync(token, globalKey)
        let u_id = verify.id
        let data = await this.sethealthMod(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill)
        resp.send(data)
    }

    /**
     * 分页获取当天填报表与总数量
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async gethealthNowDayPage(req, resp) {
        let date = new Date();
        let Month = ""
        if ((date.getMonth() + 1) < 10) Month = "0" + String((date.getMonth() + 1))
        else Month = (date.getMonth() + 1) + ""
        let newDate = "" + date.getFullYear() + Month + date.getDate()
        let lastDate = "" + date.getFullYear() + Month + (date.getDate() + 1)
        let currPage = req.query.currPage
        let pageNum = req.query.pageNum
        let data = await this.gethealthNowDayPageMod(newDate, lastDate, currPage, pageNum)
        let total = await this.gethealthNowDayPageTotal(newDate, lastDate)
        resp.send({data, total: total[0].count})
    }

    /**\
     * 获取当天某用户报表
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getHealthNowDayByid(req, resp) {
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_id = verify.id
        let newDate = this.getNowAndLastDate().newDate
        let lastDate = this.getNowAndLastDate().lastDate
        let data = await this.getHealthNowDayByidMod(u_id, newDate, lastDate)
        resp.send(data)
    }

    /**
     * 获取当天所有填报表
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static  async gethealthNowDay(req,resp){
        let nowDate=this.getNowAndLastDate().newDate
        let lasDate=this.getNowAndLastDate().lastDate
        let data= await this.gethealthNowDayMod(nowDate,lasDate)
        resp.send(data)

    }
    /**
     * 获取当天所有填报表
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static  async gethealthNowMonth(req,resp){
        let nowDate=this.getNowAndLastDate().nowMonth
        let lasDate=this.getNowAndLastDate().lastMonth
        let data= await this.gethealthNowMonthMod(nowDate,lasDate)
        resp.send(data)
    }
    /**
     * 获取所有填报表
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static  async getAllHealth(req,resp){
        let data= await this.getAllHealthMod()
        resp.send(data)
    }

    /**
     * 学生请假表申请
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static  async setLeave(req,resp){
        let body=req.body
        let verify=await jwtUtil.verifysync(body.token,globalKey)
        let u_id=verify.id
        let classes=verify.classes
        let reason =body.reason
        let leavetype =body.leavetype
        let starttime =body.starttime
        let endtime =body.endtime

        let results=await this.setLeaveMod(u_id,classes,reason,leavetype,starttime,endtime)

            resp.send(results)

    }

}