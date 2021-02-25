var express = require('express');
var router = express.Router();
let admin = require('../middleware/admin_mid')
const fileUp = require('../utils/fileUtils')
const redisUtils = require('../utils/redisUtils')

/**
 * 发布通告
 */
router.post('/announce', function (req, res, next) {
    admin.announce(req, res)
});
/**
 * 获取该用户所属班级请假审批与数量(分页)
 */
router.get('/getLeave', function (req, res, next) {
    admin.getLeave(req, res)
});
/**
 * 获取该用户请假审批与数量(分页)
 */
router.get('/getuserLeave', function (req, res, next) {
    admin.getuserLeave(req, res)
});
/**
 * 修改当前请假单审批状态
 */
router.get('/upLeaveState', function (req, res, next) {
    admin.upLeaveState(req, res)
});

/**
 * 分页获取所有的通知与总数量
 */
router.get('/getAllNotice', function (req, res, next) {
    admin.getAllNotice(req, res)
});
/**
 * 模糊查询分页获取
 */
router.get('/getUsersByTypeAndChar', function (req, res, next) {
     admin.getUsersByTypeAndChar(req, res)
});
/**
 * 管理员添加班级
 */
router.get('/addClasses', function (req, res, next) {
     admin.addClasses(req, res)
});
/**
 * 管理员获取班级班级
 */
router.get('/getClasses', function (req, res, next) {
     admin.getClasses(req, res)
});
/**
 * 管理员获取班级班级
 */
router.get('/getClassesSear', function (req, res, next) {
     admin.getClassesSear(req, res)
});
/**
 * 当前公告查看详情
 */
router.get('/NoticeDetails', function (req, res, next) {
     admin.NoticeDetails(req, res)
});
/**
 * 当前 公告删除功能
 */
router.get('/delNotice', function (req, res, next) {
     admin.delNotice(req, res)
});


module.exports = router;
