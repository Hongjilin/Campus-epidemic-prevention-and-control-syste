

const  jwtUtil=require('../utils/jwtUtils')
const  redisUtils=require('../utils/redisUtils')
module.exports=class users_dao extends  require('../model/users_mod'){
    /**
     * 登录
     * @param req
     * @param resp
     * @returns {Promise<void>}
     * @constructor
     */
    static  async Login(req,resp){
        let body= req.body
        let loginData= await  this.LoginUser(body.username,body.password,body.type)
        // let loginData= await  this.LoginUserByid(body.username,body.password,body.type)
        //如果获取到了登录用户信息则登陆成功
        if (loginData.length!=0){
            let jwt_token= jwtUtil.sign({
                id:loginData[0].id,
                username:loginData[0].username,
                head:loginData[0].head,
                type:loginData[0].type,
                classes:loginData[0].classes,
                address:loginData[0].address,
                createtime:loginData[0].createtime,
                sex:loginData[0].sex
            },global.globalKey,3600)
            resp.send({loginData,jwt_token})
        }else  resp.status(500).send("用户名或者账号输入错误")
    }

    /**
     * 根据token解析成用户信息
     * @param req
     * @param resp
     */
    static async getUserDataByToken(req,resp){
        let result=await jwtUtil.verifysync(req.query.token,global.globalKey)
        resp.send(result)
    }

    /**
     * 根据用户类型进行用户信息获取(分页获取总数量与数据)
     * @param req
     * @param resp
     */
    static async getUsersByTypePage(req,resp){
        // console.log(req.query)
        let query=req.query;
        let data = await this.getUsersByTypePageMod(query.type,query.currPage,query.pageNum)
        let total=await this.getUsersByTypePageTotal(query.type)
        resp.send({data,total:total[0].count})
    }
    /**
     * 用户删除(同时清空该用户阅读记录
     * @param req
     * @param resp
     */
    static async delUserdata(req,resp){
            let results= await this.delUserdataMod(req.query.u_id)
            results+=await  this.delRead(req.query.u_id)
          resp.send(results)
    }
    /**
     * 更改用户信息
     * @param req
     * @param resp
     */
    static async upUserdata(req,resp){
        let body= req.body
        let u_id=body.u_id
        let username=body.username
        let sex=body.sex
        let address=body.address
        let type=body.type
            let results= await this.upUserdataMod(u_id,username,sex,address,type)
          resp.send(results)
    }

    /**
     * 将redis的xlsx数据写入数据库
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async setXlsxData(req,resp){
        // console.log("点击导入")
        let xlsxData=await redisUtils.get("xlsxData")
        let AllUsers=await  this.getAllUserX();
        if (xlsxData=='err') {
            resp.send("导入失败,不是标准的文件格式")
            return
        }
        xlsxData=JSON.parse(xlsxData)[0].data
        let inXlsxArr=[];
        let infalg=true;
        // console.log(xlsxData[0].length)
        if (xlsxData[0].length!=8) resp.send("导入的表格数据格式错误")

        for (let i=1;i<xlsxData.length;i++){
            if (xlsxData[i][0]!=0){
                let falg=true;
                let xlsxObj={};
                if (xlsxData[i][0]==null || xlsxData[i][1]==null || xlsxData[i][2]==null || xlsxData[i][4]==null || xlsxData[i][5]==null || xlsxData[i][6]==null || xlsxData[i][7]==null) {
                    infalg=false
                }
                xlsxObj.id=xlsxData[i][0]
                xlsxObj.username=xlsxData[i][1]
                xlsxObj.password=xlsxData[i][2]
                xlsxObj.head=xlsxData[i][3]||'1.jpg'
                xlsxObj.address=xlsxData[i][4]
                xlsxObj.sex=xlsxData[i][5]
                xlsxObj.classes=xlsxData[i][6]
                xlsxObj.type=xlsxData[i][7]
                for (let j=0;j<AllUsers.length;j++){
                    if (xlsxObj.id==AllUsers[j].id) falg=false
                }
                if (falg) inXlsxArr.push(xlsxObj)
            }
        }
        if (infalg){
            if (inXlsxArr.length!=0) this.inXlsxData(inXlsxArr)
            resp.send("导入数据成功")
        }else resp.status(500).send("导入文件中的数据部分格式错误,导入失败")

    }


    /**
     * **************************************修改个人信息**************************************
     */
    /**
     * 修改个人密码
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static  async upPwd(req,resp){
        let verify=await  jwtUtil.verifysync(req.body.token,globalKey)
        let u_id=verify.id
        let oldpassword=req.body.oldpassword
        let newpassword=req.body.newpassword
        let results=await this.upPwdMod(u_id,oldpassword,newpassword)
        if (results.changedRows==0)        resp.send("修改失败,可能是旧密码错误或者新密码与旧密码相同")
        else  resp.send("密码修改成功")
    }

    /**
     * 修改个人头像
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async upUserHead(req,resp){
        // console.log(req.u_id)
        let results=await this.upUserHeadMod(req.head_imgUrl,req.u_id)
        resp.send(results)
    }


}