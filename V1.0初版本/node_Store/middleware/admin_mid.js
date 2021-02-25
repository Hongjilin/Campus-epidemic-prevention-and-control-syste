const admin = require('../model/admin_mod');
const tools = require('../utils/tools')
const jwtUils = require('../utils/jwtUtils')
const redisUtils = require('../utils/redisUtils')
const User = require('../model/user_mod')
/**
 * 发布公告
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let announce = async (req, resp) => {
    let title = req.body.title
    let classes = req.body.classes
    let results = await admin.announce(title, classes);
    resp.send(results)
}
/**
 * 请假审批
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getLeave = async (req, resp) => {
    let UserData = await User.getUserDataById(req.query.u_id)
    let classArr = UserData[0].classes.split(";")
    let data = await admin.getLeave(classArr, req.query.currPage, req.query.pageNum);
    let total = await admin.getLeaveSize(classArr);
    if (total.length!=0)
    resp.send({data, total: total[0].count})
    else
    resp.send( {data, total:"0"} )
    // resp.send(results)
}
/**
 * 请假审批
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getuserLeave = async (req, resp) => {
    let data = await admin.getuserLeave(req.query.u_id, req.query.currPage, req.query.pageNum);
    let total = await admin.getuserLeaveSize(req.query.u_id);
    resp.send({data, total: total[0].count})
}
/**
 * 添加班级
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let addClasses = async (req, resp) => {
    let classAll = await admin.getClasses();
    let data = await admin.addClasses(req.query.Classes, classAll);
    resp.send({data})
}
/**
 * 获取班级
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getClasses = async (req, resp) => {
    let data = await admin.getClasses();
    resp.send({data})
    // resp.send(results)
}
/**
 * 模糊查询班级
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getClassesSear = async (req, resp) => {
    let clsses=req.query.inputText;
    let data = await admin.getClassesSear(clsses,req.query.pageNum,req.query.currPage);
    let total = await admin.getClassesTotal()||0;
    resp.send({data,total: total[0].count})
    // resp.send(results)
}
/**
 * 修改当前请假单审批状态
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let upLeaveState = async (req, resp) => {
    let results = await admin.upLeaveState(req.query.l_id, req.query.upState);
    resp.send(results)
}

/**
 * 分页获取所有的通知与总数量
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getAllNotice = async (req, resp) => {
    let pageNum = req.query.pageNum
    let currPage = req.query.currPage
    let data = await admin.getAllNotice(pageNum, currPage)
    let total = await admin.getAllNoticeSize()
    resp.send({data, total: total[0].count})
}
/**
 * 当前公告查看详情
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let NoticeDetails = async (req, resp) => {
    let n_id = req.query.n_id
    console.log("---------------------sss----------------------------------------------")
    console.log(n_id)
    let getreadById={};
    //获取当前公告已读人的人数
    let readNum = await admin.getreadNum(n_id)
    readNum = readNum[0].count
    let readId=await  admin.getreadId(n_id)
    console.log(readId.length)
    if (readId.length!=0)
     getreadById=await  admin.getreadById(readId)
    //获取当前通知的详情
    let data = await admin.NoticeDetails(n_id)
    //获取该通知通知的总人数
    let allNum = await admin.NoticeAllNum(data[0].class)
    allNum=allNum[0].count
    let idAndtime =  await admin. getreadtime(n_id)
    resp.send({data,total:allNum,readNum:readNum,users:getreadById,idAndtime})

}

/**
 * 分页获取模糊搜索结果
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getUsersByTypeAndChar = async (req, resp) => {
    let query = req.query
    let pageNum = req.query.pageNum
    let currPage = req.query.currPage
    let inputText = query.inputText
    let CharType = query.CharType
    let type = query.type

    let data = await admin.getUsersByTypeAndChar(type, inputText, CharType, currPage, pageNum)
    let total = await admin.getUsersByTypeAndCharSize(type, inputText, CharType)
    resp.send({data, total: total[0].count})
}

/**
 * 删除公告
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let delNotice = async (req, resp) => {
    let results=await admin.delNotice(req.query.n_id)
    results+=await admin.delReads(req.query.n_id)
    resp.send(results)
}

module.exports = {
    announce,
    getLeave,
    // getLeaveSize,
    upLeaveState,
    // getAllNoticeSize,
    getAllNotice,
    NoticeDetails,
    getUsersByTypeAndChar,
    addClasses,
    getClasses,
    getClassesSear,
    delNotice,
    getuserLeave
    // getUsersByTypeAndCharSize
}
