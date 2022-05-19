const jwt = require('jsonwebtoken')
const path = require('path')

const { getUserInfo, updateById, updateIcon, findUserfever, findgohisk, findfill } = require('../service/user.service')
var key = 'fxw'

class UserController {
    // 用户登录
    async login(ctx, next) {
        const { id } = ctx.request.body
            // ctx.body = username
        try {
            const { password, ...res } = await getUserInfo(id)

            ctx.body = {
                res,
                result: { token: jwt.sign(res, key, { expiresIn: '100d' }) }


            }

        } catch (error) {
            console.log(error);
        }
    }

    // 密码修改
    async changPassword(ctx, next) {
            // 
            const { id } = ctx.state.user
            const { password } = ctx.request.body
                // 操作数据库

            if (await updateById({ id, password })) {
                ctx.body = {
                    message: "用户密码修改成功",
                    id
                }
            }
        }
        // 用户信息获取
    async getUserDataByToken(ctx) {
        const { id } = ctx.state.user
        const res = await getUserInfo(id)
        ctx.body = res
    }

    // 用户头像修改
    async upicon(ctx) {
        const { id } = ctx.state.user || {}
        const { file } = ctx.request.files || {}

        if (!file) return
        const head = path.basename(file.path)
        const res = await updateIcon(id, head)

        if (res) {
            ctx.body = {
                success: true,
                msg: '"成功修改头像"'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '"请重新上传"'
            }
        }
    }

    // 今日发烧总数
    async getUserfever(ctx) {
        const { filldata } = ctx.request.query
        const res = await findUserfever(filldata)
        ctx.body = {
            count: res
        }
    }

    // 14天内经过高危地区人数
    async gorisk(ctx) {
        const { filldata } = ctx.request.query
        const res = await findgohisk(filldata)
        ctx.body = {
            count: res
        }
    }

    // 今日填报总数
    async getfill(ctx) {
        const { filldata } = ctx.request.query
        const res = await findfill(filldata)
        ctx.body = {
            count: res
        }
    }

}
module.exports = new UserController()