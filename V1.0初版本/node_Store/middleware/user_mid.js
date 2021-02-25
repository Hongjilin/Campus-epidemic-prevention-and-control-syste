const User = require('../model/user_mod');
const tools = require('../utils/tools')
const jwtUtil = require('../utils/jwtUtils')
const redisUtils = require('../utils/redisUtils')
/**
 * 登录接口

 */
let getUserlogin = async (req, resp) => {
    let query = req.body;
    let name = query.username;
    let pwd = query.password;
    let type=query.type
    let UserloginData = await User.getUser(name, pwd,type)
    if (UserloginData.length != 0) {
        //将需要的登录用户数据加密为token
        let jwt_token = jwtUtil.sign(
            {  id: UserloginData[0].id,
                username:UserloginData[0].username,
                head:UserloginData[0].head,
                type,

            },
            global.globalKey, 3600)
        resp.send({UserloginData, jwt_token})
    } else {
        resp.status(500).send("用户名或者账号输入错误");
    }
}

let getPostUserDataById=async  (req,resp)=>{
    let body = req.body;
    let u_id=body.u_id;
    console.log(u_id)
    let getUserDataById= await User.getUserDataById(u_id);
     resp.send(getUserDataById)
}

let getGetUserDataById=async  (req,resp)=>{
    let result = await jwtUtil.verifysync(req.query.token, global.globalKey)
    resp.send(result)
}
let getUserDataByToken=async  (req,resp)=>{
    let result = await jwtUtil.verifysync(req.query.token, global.globalKey)
    resp.send(result)
}

/**
 * 修改头像
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let upUserHead = async (req, resp) => {
   let upUserHeadres=await User.upUserHead(req.head_imgUrl, req.u_id)
    resp.send(upUserHeadres)
}
/**
 * 删除用户
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let delUser = async (req, resp) => {
   let results=await User.delUser(req.query.u_id)
    results+=await User.delRead(req.query.u_id)
    resp.send(results)
}
/**
 * 修改名字
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let upUserdata = async (req, resp) => {
   User.upUserdata(req.body.u_id,req.body.username,req.body.sex,req.body.address, req.body.type)
    resp.send("已经进行修改")
}
/**
 * 修改个人密码
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let upUserPwd = async (req, resp) => {
    let a=await User.upUserPwd(req.body.oldpassword, req.body.newpassword,req.body.u_id)
    if (a.changedRows==0)
    resp.send("修改失败,可能是旧密码错误或者旧密码与新密码相同")
    else
        resp.send("修改成功")
}
/**
 * 根据类型获取用户信息列表与数量(分页查询)
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getUsersByTypePage = async (req, resp) => {
    let data=await  User.getUsersByTypePage(req.query.type,req.query.currPage,req.query.pageNum)
    let total=await  User.getUsersTotalByType(req.query.type)
    resp.send({data,total:total[0].count})
}
/**
 * 获取所有用户信息列表(分页查寻)
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let getAllUsers = async (req, resp) => {
    let pageNum=req.query.pageNum
    let currPage=req.query.currPage
    let data=await  User.getAllUsers(pageNum,currPage)
    let total =await  User.getAllUsersSize();
    if (data.length==0)
        resp.send()
    else{
        resp.send({data,total:total[0].count})
    }
}

/**
 * 将redis的xlsx数据写入数据库
 * @param req
 * @param resp
 * @returns {Promise<void>}
 */
let setXlsxData = async (req, resp) => {
    let xlsxData=await redisUtils.get('xlsxData')
    let AllUsers=   await User.getAllUsersX()
    if (xlsxData=="err") {
        resp.send("导入失败,因为不是标准的文件及格式")
        return;
    }
     xlsxData=JSON.parse(xlsxData)[0].data
    let inXlsxArr=[];
    let upXlsxArr=[];
    let infalg=true;
//如果上传的文件中数据不是8个,则肯定格式错误
    if (xlsxData[0].length!=8){
        resp.send("导入的表格数据格式错误或者上传表格")
    }
    for (let i=1;i<xlsxData.length;i++){
        if (xlsxData[i][0]!=0){
        let falg=true;
        let xlsxObj={};
        if (xlsxData[i][0]==null||xlsxData[i][1]==null||xlsxData[i][2]==null||xlsxData[i][4]==null||xlsxData[i][5]==null||xlsxData[i][6]==null||xlsxData[i][7]==null){
            infalg=false
        }
        xlsxObj.id=xlsxData[i][0]
        xlsxObj.username=xlsxData[i][1]
        xlsxObj.password=xlsxData[i][2]
        xlsxObj.head=xlsxData[i][3]||"2020080517084240084.jpg"
        xlsxObj.address=xlsxData[i][4]
        xlsxObj.sex=xlsxData[i][5]
        xlsxObj.classes=xlsxData[i][6]
        xlsxObj.type=xlsxData[i][7]
        // inXlsxArr.push(xlsxObj)
        for (let j=0;j<AllUsers.length;j++){
            if ( xlsxObj.id==AllUsers[j].id)
                falg=false
        }
        if (!falg)   upXlsxArr.push(xlsxObj)
        else inXlsxArr.push(xlsxObj)
        }
    }
    if (infalg){
        if (inXlsxArr.length!=0) User.inXlsxData(inXlsxArr);
        resp.send("导入成功")
    }else {
        resp.status(500).send("导入文件中部分格式错误,导入失败")
    }
}

module.exports = {
    getUserlogin,
    upUserHead,
    upUserdata,
    upUserPwd,
    getUsersByTypePage,
    setXlsxData,
    getAllUsers,
    delUser,
    getPostUserDataById,
    getGetUserDataById,
    getUserDataByToken

}
