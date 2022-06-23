const Router = require('koa-router')
const router = new Router({ prefix: '/student' })
const { sethealth, setLeave, getmyLeave, gethealth, uploadXC, uploadZP, subTravel, findTravel } = require('../controller/student.controller')
const { auth } = require('../middleware/auth.middleware')
    //学生健康填报
router.post('/sethealth', auth, sethealth)

// 学生请假申请
router.post('/setLeave', auth, setLeave)

// 上传行程码
router.post('/uploadXC/:id', uploadXC)


// 上传自拍照
router.post('/uploadZP/:id', uploadZP)

// 提交行程管理数据
router.post('/subTravel', subTravel)

// 查询行程数据(根据学号)
router.post('/findTravel', auth, findTravel)
    // 获取个人请假表
router.post('/getmyLeave', auth, getmyLeave)

// 获取当天填报表
router.get('/gethealth', auth, gethealth)
module.exports = router