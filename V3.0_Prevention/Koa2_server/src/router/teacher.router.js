const Router = require('koa-router')
const router = new Router({ prefix: '/teacher' })
const { auth } = require('../middleware/auth.middleware')
const { getLeave, upLeaveState } = require('../controller/teacher.controller')
    // 获取该老师所属学院的全部请假单与数量(分页查询)
router.get('/getLeave', auth, getLeave)


// 请假审批(修改审批状态)
router.get('/upLeaveState', upLeaveState)
module.exports = router