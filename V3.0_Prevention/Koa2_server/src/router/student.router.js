const Router = require('koa-router')
const router = new Router({ prefix: '/student' })
const { sethealth, setLeave, getmyLeave, gethealth } = require('../controller/student.controller')
const { auth } = require('../middleware/auth.middleware')
    //学生健康填报
router.post('/sethealth', auth, sethealth)

// 学生请假申请
router.post('/setLeave', auth, setLeave)

// 获取个人请假表
router.post('/getmyLeave', auth, getmyLeave)

// 获取当天填报表
router.get('/gethealth', auth, gethealth)
module.exports = router