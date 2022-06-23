const Router = require('koa-router')
const router = new Router({ prefix: '/teacher' })
const { auth } = require('../middleware/auth.middleware')
const { getLeave, upLeaveState, getHealthy, allTeavel, notClock } = require('../controller/teacher.controller')
    // 获取该老师所属学院的全部请假单与数量(分页查询)
router.get('/getLeave', auth, getLeave)


// 获取该老师所属学院的全部健康表(按类型查询,分页查询)
router.get('/getHealthy', auth, getHealthy)
    // 请假审批(修改审批状态)
router.get('/upLeaveState', upLeaveState)


// 查询今日未健康打卡数据
router.post('/notClock', auth, notClock)
router.post('/allTeavel', auth, allTeavel)
module.exports = router