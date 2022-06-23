const Router = require('koa-router')
const router = new Router({ prefix: '/admin' })
const { getUsersByTypePage, upload, uploadUser, daochu, getallhealthy, notice, findUser } = require('../controller/admin.controller')


// 获取用户信息和数量
router.get('/getUsersByTypePage', getUsersByTypePage)


// 将前端解析的excel健康文件数据批量写入后台
router.post('/upload', upload)

// 获取学生健康表
router.get('/getallhealthy', getallhealthy)
    // 导出学生健康填报表
router.post('/daochu', daochu)

// 发布通知
router.get('/notice', notice)
    // 导入学生数据
router.post('/uploadUser', uploadUser)

// 查询所有用户数据(支持模糊查询)
router.post('/findUser', findUser)
module.exports = router