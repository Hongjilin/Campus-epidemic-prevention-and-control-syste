var express = require('express');
var router = express.Router();
const  admin = require('../dao/admin_dao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('admin进入路由根目录');
});
router.get('/getUsersByTypeAndChar', function(req, res, next) {
        admin.getUsersByTypeAndChar(req,res)
});
/**
 * 发布公告
 */
router.post('/announce', function(req, res, next) {
        admin.announce(req,res)
});
/**
 * 分页获取所有通知与数量
 */
router.get('/getAllNotice', function(req, res, next) {
    admin.getAllNotice(req,res)
});
/**
 * 获取该老师所属班级的全部请假单与数量(分页查询)
 */
router.get('/getLeave', function(req, res, next) {
    admin.getLeave(req,res)
});
/**
 *  获取该用户请假审批与数量(分页)
 */
router.get('/getuserLeave', function(req, res, next) {
    admin.getuserLeave(req,res)
});
/**
 *  当前请假单审批(修改审批状态)
 */
router.get('/upLeaveState', function(req, res, next) {
    admin.upLeaveState(req,res)
});
/**
 *******************增值功能:公告**************************
 */

router.get("/NoticeDetails",function (req,res) {
    admin.NoticeDetails(req,res)
})
router.get("/delNotice",function (req,res) {
    admin.delNotice(req,res)
})
/**
 * ************************增值功能:班级添加******************************
 */
router.get("/addClasses",function (req,res) {
    admin.addClasses(req,res)
})
router.get("/getClasses",function (req,res) {
    admin.getClasses(req,res)
})
router.get("/getClassesSear",function (req,res) {
    admin.getClassesSear(req,res)
})


module.exports = router;
