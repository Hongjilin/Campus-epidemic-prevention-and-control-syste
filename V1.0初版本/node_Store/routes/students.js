var express = require('express');
var router = express.Router();
let student = require('../middleware/student_mid')
const fileUp = require('../utils/fileUtils')
const redisUtils = require('../utils/redisUtils')


/**
 * 学生填报表
 */
router.post('/sethealth', function (req, res, next) {
    student.setHealth(req, res)
});
/**
 * 获取当天学生填报表
 */
router.get('/gethealthNowDay', function (req, res, next) {
    student.gethealthNowDay(req, res)
});
/**
 * 分页获取当天学生填报表与数量
 */
router.get('/gethealthNowDayPage', function (req, res, next) {
    student.gethealthNowDayPage(req, res)
});
/**
 * 根据id获取用户当日报表数据
 */
router.get('/getHealthNowDayByid', async function (req, res) {
    student.getHealthNowDayByid(req, res)
})

/**
 * 获取所有报表
 */
router.get('/getAllHealth', function (req, res, next) {
    student.getAllHealth(req, res)
});
/**
 * 分页获取我的通知与数量
 */
router.get('/getNotice', function (req, res, next) {
    student.getNotice(req, res)
});

/**
 *修改已读未读
 */
router.get('/setNoticeRead', function (req, res, next) {
    console.log(req.query.readFalg)
    if (req.query.readFalg==1){

    }
    // student.getNoticeSize(req, res)
});

/**
 *获取我的已读通知
 */
router.get('/getNoticeRead', function (req, res, next) {
    student.getNoticeRead(req, res)
});
/**
 *已读改为未读
 */
router.get('/goweidu', function (req, res, next) {
    student.goweidu(req, res)
});
/**
 *未读改为已读
 */
router.get('/goyidu', function (req, res, next) {
    student.goyidu(req, res)
});
/**
 *申请请假表
 */
router.post('/setLeave', function (req, res, next) {
    student.setLeave(req, res)
});


module.exports = router;
