const Student = require('../model/student_mod');
const tools = require('../utils/tools')
const jwtUils = require('../utils/jwtUtils')
const redisUtils = require('../utils/redisUtils')
const  User=require('../model/user_mod')

/**
 * 健康表填写
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let setHealth = async (req, resp) => {
    let u_id=req.body.u_id
    let body = req.body
    let temperature = body.temperature
    let hot = body.hot
    let gohubei = body.gohubei
    let hubeiren = body.hubeiren
    let  fever = body.fever
    let  leave = body.leave
    let  hesuan = body.hesuan
    let  mask = body.mask
    let   masknum = body.masknum;
    let    kill = body.kill;
    let re = /^[0-9]+.?[0-9]*$/;

        let results=await  Student.setHealth(u_id,temperature,hot,gohubei,hubeiren,fever,leave,hesuan,mask,masknum,kill)
        resp.send("健康表填报完成")

}

/**
 * 获取当天填报表
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let gethealthNowDay = async (req, resp) => {
    var date = new Date();
    let Month="";
    if ((date.getMonth()+1)<10)
        Month="0"+String((date.getMonth()+1))
    else
        Month =(date.getMonth()+1)+""
    let newDate=""+date.getFullYear()+Month+date.getDate()
    let lastDate=""+date.getFullYear()+Month+(date.getDate()+1)
   let gethealthNowDay=await  Student.gethealthNowDay(newDate,lastDate)
    resp.send(gethealthNowDay)
}
/**
 * 分页获取当天填报表与总数量
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let gethealthNowDayPage = async (req, resp) => {
    var date = new Date();
    let Month="";
    if ((date.getMonth()+1)<10)
        Month="0"+String((date.getMonth()+1))
    else
        Month =(date.getMonth()+1)+""
    let newDate=""+date.getFullYear()+Month+date.getDate()
    let lastDate=""+date.getFullYear()+Month+(date.getDate()+1)
   let data=await  Student.gethealthNowDayPage(newDate,lastDate,req.query.currPage,req.query.pageNum)
    let total=await  Student.gethealthNowDaySize(newDate,lastDate)
    resp.send({data,total:total[0].count})

}
/**
 * 根据id获取用户当日报表数据
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getHealthNowDayByid = async (req, resp) => {
    var date = new Date();
    let Month="";
    if ((date.getMonth()+1)<10)
        Month="0"+String((date.getMonth()+1))
    else
        Month =(date.getMonth()+1)+""
    let newDate=""+date.getFullYear()+Month+date.getDate()
    let lastDate=""+date.getFullYear()+Month+(date.getDate()+1)
// console.log(req.query.u_id)
   let data=await  Student.getHealthNowDayByid(newDate,lastDate,req.query.u_id)
    // let total=await  Student.gethealthNowDaySize(newDate,lastDate)
    resp.send({data})

}
/**
 * 获取所有填报表
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getAllHealth = async (req, resp) => {
   let getAllHealth=await  Student.getAllHealth()
    resp.send({data:getAllHealth})
}
/**
 * 分页获取我的通知
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getNotice = async (req, resp) => {
    let UserData=await   User.getUserDataById(req.query.u_id)
    let u_class=UserData[0].classes
    let pageNum=req.query.pageNum
    let currPage=req.query.currPage
   let data=await  Student.getNotice(u_class,pageNum,currPage)
    let total=await  Student.getNoticeSize(u_class)
    resp.send({data,total:total[0].count})
}

/**
 * 获取我的已读通知
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getNoticeRead = async (req, resp) => {
    let u_id=req.query.u_id
   let readNotice=await  Student.getNoticeRead(u_id)
        resp.send({data:readNotice})
}
/**
 * 已读转未读
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let goweidu = async (req, resp) => {
    let u_id=req.query.u_id
    let n_id =req.query.n_id;
   let readNotice=await  Student.goweidu(u_id,n_id)
        resp.send({data:readNotice})
}
/**
 * 未读转已读
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let goyidu = async (req, resp) => {
    let u_id=req.query.u_id
    let n_id =req.query.n_id;
   let readNotice=await  Student.goyidu(u_id,n_id)
        resp.send({data:readNotice})
}
/**
 * 学生请假表申请
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let setLeave = async (req, resp) => {

    let u_id=req.body.u_id;
    let UserData=await   User.getUserDataById(u_id)
    let classes=UserData[0].classes
    let body=req.body
    let reason=body.reason
    let leavetype=body.leavetype
    let starttime=body.starttime
    let endtime=body.endtime

 let setLeave=  await  Student.setLeave(u_id,classes,reason,leavetype,starttime,endtime)
       resp.send({data:setLeave})

}



module.exports = {
    setHealth,
    gethealthNowDay,
    getAllHealth,
    getNotice,
    // getNoticeSize,
    getNoticeRead,
    goweidu,
    goyidu,
    setLeave,
    gethealthNowDayPage,
    getHealthNowDayByid
}
