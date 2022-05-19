const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const auth = async(ctx, next) => {
    const { authorization = '' } = ctx.request.header || {}
    const token = authorization.replace('Bearer ', '')
    console.log(token, "tokentokentokentokentokentokentokentokentokentokenASDASDFSDFA产生的辐射的发射点发射点发生的发")
        // if (!token) return

    try {
        const { mailbox, iat, exp, ...user } = jwt.verify(token, 'fxw')

        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                return ctx.body = "token已过期"
            case 'JsonWebTokenError':
                console.error(error)
                return ctx.body = "无效的token"
        }
    }
    await next()
}

module.exports = {
    auth
}