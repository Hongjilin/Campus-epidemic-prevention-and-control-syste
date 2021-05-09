var express = require('express');
var router = express.Router();
const  student=require('../dao/student_dao')

router.get('/',function (req,res) {
    res.send("students进入根目录")
})
/**
 * 我的通知分页获取数据
 */
router.get('/getNotice',function (req,res) {
    student.getNotice(req,res)
    
})
/**
 * 获取的我通知已读列表(供已读未读状态渲染)
 */
router.get('/getNoticeRead',function (req,res) {
    student.getNoticeRead(req,res)
})
/**
 * 已读转未读
 */
router.get('/goweidu',function (req,res) {
    student.goweidu(req,res)
})
/**
 * 未读转已读
 */
router.get('/goyidu',function (req,res) {
    student.goyidu(req,res)
})
/**
 * ******************************填报表部分*********************************/
/**
 *  健康填报表提交
 */
router.post('/sethealth',function (req,res) {
    student.sethealth(req,res)
})

/**
 * 分页获取当天填报表与总数量
 */
router.get('/gethealthNowDayPage',function (req,res) {
    student.gethealthNowDayPage(req,res)
})
/**
 * 获取当天某用户报表
 */
router.get('/getHealthNowDayByid',function (req,res) {
    student.getHealthNowDayByid(req,res)
})
/**
 * 获取当天所有填报表
 */
router.get('/gethealthNowDay',function (req,res) {
    student.gethealthNowDay(req,res)
})
/**
 * 获取当月所有填报表
 */
router.get('/gethealthNowMonth',function (req,res) {
    student.gethealthNowMonth(req,res)
})
/**
 * 获取所有填报表
 */
router.get('/getAllHealth',function (req,res) {
    student.getAllHealth(req,res)
})
router.post('/setLeave',function (req,res) {

    student.setLeave(req,res)
    
})







module.exports = router;