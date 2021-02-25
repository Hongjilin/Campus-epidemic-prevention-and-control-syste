var express = require('express');
var router = express.Router();
let user = require('../middleware/user_mid')
const fileUp = require('../utils/fileUtils')
const redisUtils = require('../utils/redisUtils')
// 增加一个名为 IsPicture 的函数作为
// String 构造函数的原型对象的一个方法。
String.prototype.IsPicture = function()
{
    //判断是否是图片 - strFilter必须是小写列举
    let strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|"
    if(this.indexOf(".")>-1)
    {
        let p = this.lastIndexOf(".");
        let strPostfix=this.substring(p,this.length) + '|';
        strPostfix = strPostfix.toLowerCase();
        if(strFilter.indexOf(strPostfix)>-1)
        {
            return true;
        }
    }
    return false;
}


/**
 * 用户一级路由
 */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/**
 * 用户登录验证路由
 */
router.post('/login', function (req, res, next) {
    user.getUserlogin(req, res)
});
/**
 * 将redis的xlsx数据写入数据库
 */
router.post('/setXlsxData', function (req, res, next) {
    user.setXlsxData(req, res)
});
/**
 * 根据类型获取用户信息列表与数量(分页查询)
 */
router.get('/getUsersByTypePage',async function (req,res) {
       user.getUsersByTypePage(req,res)
})
/**
 * 分页获取所有用户信息与数量
 */
router.get('/getAllUsers',async function (req,res) {
       user.getAllUsers(req,res)
})
/**
 * 删除选中的用户信息
 */
router.get('/delUserdata',async function (req,res) {
       // user.getAllUsers(req,res)
    if (req.query.u_id==0){
        res.send("您不能删除管理员")
    } else
    user.delUser(req,res)
})


/**
 * 用户头像上传一级路由
 */
router.post('/upicon', async function (req, res, next) {
    let head_imgUrl = await fileUp.upload(req)
    req.head_imgUrl = head_imgUrl;
    let isPitcure = head_imgUrl.IsPicture();
    if (!isPitcure) {
        res.send("没有选择图片或者选择的不是图片")
    }
    else{
        req.u_id =  req.query.u_id
        user.upUserHead(req, res);
    }
});
/**
 * 修改用户名一级路由
 */
router.post('/upUserdata', async function (req, res) {
    // req.body.u_id
    // user.upUserName(req, res)
    user.upUserdata(req, res)
})
/**
 * 修改用户密码一级路由
 */
router.post('/upPwd', async function (req, res) {
    // req.body.u_id
    user.upUserPwd(req, res)
})
/**
 * 根据id获取用户数据
 */
router.post('/getUserDataById', async function (req, res) {
    // req.body.u_id
    user.getPostUserDataById(req, res)
})
/**
 * 根据id获取用户数据
 */
router.get('/getUserDataById', async function (req, res) {
    // req.body.u_id
    user.getGetUserDataById(req, res)
})
/**
 * 根据token获取用户数据
 */
router.get('/getUserDataByToken', async function (req, res) {
    // req.body.u_id
    user.getUserDataByToken(req, res)
})

module.exports = router;
