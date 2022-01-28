const Router = require('koa-router')
const router = new Router({ prefix: '/admin' })
const { getUsersByTypePage, upload, daochu } = require('../controller/admin.controller')


// 获取用户信息和数量
router.get('/getUsersByTypePage', getUsersByTypePage)


// 用户上传exccel文件(未完成)
router.post('/upload', upload)


// 导出学生健康填报表(未完成)
router.post('/daochu', daochu)

module.exports = router