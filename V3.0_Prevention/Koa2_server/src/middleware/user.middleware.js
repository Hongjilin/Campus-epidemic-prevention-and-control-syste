const { getUserInfo } = require('../service/user.service')

// login验证中间件
const verifyUser = async(ctx, next) => {
    const { id, password } = ctx.request.body

    // 判断用户有没有存在
    try {
        const res = await getUserInfo(id)
        if (!res) {
            ctx.body = {
                "message": "学号不存在"
            }
            return
        }

        // 判断密码是否正确
        if (password != res.password) {
            ctx.body = {
                "message": "密码错误"
            }
            return
        }
    } catch (error) {

    }
    await next()
}

module.exports = { verifyUser }