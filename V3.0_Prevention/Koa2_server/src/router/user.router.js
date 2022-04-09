const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

const { login, changPassword, upicon, getUserDataByToken, getUserfever, gorisk, getfill } = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')


// 用户登录,通过id和密码登录
router.post('/login', verifyUser, login)



// 个人信息获取
router.get('/getUserDataByToken', auth, getUserDataByToken)

// 用户头像修改
router.post('/upicon', auth, upicon)

// 用户信息修改
router.post('/upPwd', auth, changPassword)

// 查询今日发烧总数
router.get('/getUserfever', auth, getUserfever)

// 14天内经过高危地区人数
router.get('/gorisk', gorisk)

// 获取今日填报总数
router.get('/getfill', getfill)
module.exports = router