const { UsersByTypePage, findDaochu, findUserData, findallHealthy, uploadData, uploadUserData, createNovice } = require('../service/admin.sercice')
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')
const downPath = path.resolve(__dirname, '../upload');

class adminController {
    // 对用户信息与数量获取
    async getUsersByTypePage(ctx) {
        const { type, pageNum, currPage } = ctx.request.query
        const res = await UsersByTypePage(type, pageNum, currPage)
        ctx.body = {
            message: "获取用户信息成功",
            result: res
        }
    }




    // 用户文件上传
    async upload(ctx) {
            const arr = ctx.request.body

            const res = await uploadData(arr)
            if (res) return ctx.body = {
                code: "200",
                message: "用户导入成功"
            }




        }
        // 导入学生数据
    async uploadUser(ctx) {
        const arr = ctx.request.body
        const res = await uploadUserData(arr)
            // ctx.body = res
        console.log(res.code);

        return ctx.body = {
            code: 0,
            message: '用户导入成功',
            res
        }


    }




    // 导出健康表
    async daochu(ctx) {
        // const res = await findDaochu()
        // const list = Array.from(res)

        // ctx.body = "成功"

    }

    async getallhealthy(ctx) {

        const { pageNum, currPage, hot, gohighrisk, ishesuan, college } = ctx.request.query
        const res = await findallHealthy({ college, pageNum, currPage, hot, gohighrisk, ishesuan })
        ctx.body = {
            res
        }
    }

    async notice(ctx) {
        const { title, content, createtime } = ctx.request.query
        await createNovice({ title, content, createtime })
        ctx.body = "发布成功"
    }

    async findUser(ctx) {
        const { classes, grade, college, pageNum, currPage } = ctx.request.body
        const res = await findUserData({ classes, grade, college, pageNum, currPage })
        ctx.body = res
    }
}
module.exports = new adminController